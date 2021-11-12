import { getObjectVal } from '../../utils/getObjectVal'
import { Block } from '../Block'

type IContext = Record<string, HTMLElement | string | number>;

export class Template<T extends object> {
    _template: string;

    TEMPLATE_REGEXP: RegExp = /{{(.*?)}}/gi;

    TEMPLATE_REGEXP_IF: RegExp = /{{@if\s(.*?)}}(.*){{\/if}}/gi;

    constructor(template: string) {
        this._template = template
    }

    compile(ctx: T) {
        const data: IContext = {}

        Object.entries(ctx).forEach(([key, item]) => {
            data[key] = item?.element !== undefined ? item.element : item
        })
        return this._compileTemplate(data)
    }

    _compileTemplate(ctx: IContext) {
        const wrap: HTMLElement = document.createElement('div')
        wrap.innerHTML = this._compileTemplateText(ctx)

        // Фрагмент используется для добавление в обертку элемента шаблона (без лишнего div)
        const fragment: DocumentFragment = new DocumentFragment()
        Array.from(wrap.children).forEach((el) => {
            this._createChildrenNodes(fragment, el, ctx)
        })

        return fragment
    }

    // Подстановка тектовых значений в шаблон
    _compileTemplateText(ctx: IContext): string {
        let tmpl = this._template
        let key = null

        const regExpIf = this.TEMPLATE_REGEXP_IF

        /* eslint-disable-next-line no-cond-assign */
        while ((key = regExpIf.exec(tmpl))) {
            const [template, tmplValue, code] = key
            const val = getObjectVal(ctx, tmplValue)
            const replaceValue = val === undefined || val === false ? '' : code
            tmpl = tmpl.replace(template, replaceValue)
        }

        const regExp = this.TEMPLATE_REGEXP
        key = null

        /* eslint-disable-next-line no-cond-assign */
        while ((key = regExp.exec(tmpl))) {
            if (key[1]) {
                const tmplValue = key[1].trim()
                const val = getObjectVal(ctx, tmplValue) as string
                const replaceValue = val === undefined ? '' : val
                tmpl = tmpl.replace(new RegExp(key[0], 'gi'), replaceValue)
            }
        }

        return tmpl
    }

    private _createChildrenNodes(
        fragment: Node,
        element: Element,
        ctx: IContext,
    ) {
        if (element.childElementCount === 0) {
            Template._appendChild(fragment, element, ctx)
        } else {
            const clone = element.cloneNode(false)
            Array.from(element.children).forEach((el) => {
                this._createChildrenNodes(clone, el, ctx)
            })
            fragment.appendChild(clone)
        }
    }

    private static _appendChild(fragment: Node, element: Element, ctx: IContext) {
        if (element.tagName === 'TEMPLATE') {
            const path = element.getAttribute('data-context') as string
            const htmlElement = getObjectVal(ctx, path) as Block<any>[] | undefined
            if (htmlElement instanceof Array) {
                htmlElement.forEach((block) => {
                    const node = block.element as Node
                    fragment.appendChild(node)
                })
            } else if (htmlElement) {
                fragment.appendChild(htmlElement)
            }
        } else {
            fragment.appendChild(element)
        }
    }
}
