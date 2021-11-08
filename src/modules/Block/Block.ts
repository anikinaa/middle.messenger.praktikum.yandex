import { EventBus } from '../EventBus'
import { IBlock, EVENTS } from './type'

export abstract class Block<T extends object = {}> {
    static EVENTS = EVENTS;

    props: T;

    eventBus: EventBus;

    _meta: Required<IBlock<T>>;

    _element: HTMLElement | null = null;

    protected constructor(data: IBlock<T> = {}) {
        const {
            props = {} as T,
            tagName = 'div',
            attributes = {},
            events = {},
            template,
        } = data

        this._meta = {
            attributes, tagName, props, events, template: template!,
        }
        this.props = this._makePropsProxy(props)

        this.eventBus = new EventBus()
        this._registerEvents()
        this.eventBus.emit(Block.EVENTS.INIT)
    }

    private _registerEvents() {
        this.eventBus.on(Block.EVENTS.INIT, this.init.bind(this))
        this.eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
        this.eventBus.on(
            Block.EVENTS.FLOW_CDU,
            this._componentDidUpdate.bind(this),
        )
        this.eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
    }

    private _createResources() {
        const { tagName } = this._meta
        this._element = document.createElement(tagName)
        this._element.setAttribute(
            'data-element',
            this.constructor.name.toLowerCase(),
        )
    }

    private _clearElement() {
        this._element!.innerHTML = ''
    }

    private _addAttributes(): void {
        const { attributes } = this._meta

        Object.entries(attributes).forEach(([name, value]) => {
            this._element!.setAttribute(name, value ?? '')
        })
    }

    init() {
        this._createResources()
        this.eventBus.emit(Block.EVENTS.FLOW_CDM)
    }

    private _componentDidMount() {
        this.componentDidMount(this.props)
        this.eventBus.emit(Block.EVENTS.FLOW_RENDER)
    }

    /* eslint-disable */
    // @ts-ignore
    protected componentDidMount(oldProps: T | {}) {

    }
    /* eslint-enable */

    private _componentDidUpdate(oldProps: T, newProps: T) {
        const response = this.componentDidUpdate(oldProps, newProps)
        if (response) {
            this._removeEvents()
            this._clearElement()
            this.eventBus.emit(Block.EVENTS.FLOW_RENDER)
        }
        return response
    }

    /* eslint-disable */
    // @ts-ignore
    protected componentDidUpdate(oldProps: T, newProps: T) {
        return true;
    }
    /* eslint-enable */

    setProps = (nextProps: Partial<T>) => {
        if (!nextProps) {
            return
        }
        Object.assign(this.props, nextProps)
    };

    get element() {
        return this._element
    }

    _render() {
        const block = this.render()
        if (block) {
            this._element!.appendChild(block)
        }
        this._addEvents()
        this._addAttributes()
    }

    render(): DocumentFragment | null {
        const { template } = this._meta
        return template ? template.compile(this.props) : null
    }

    private _addEvents() {
        const { events = {} } = this._meta
        Object.entries(events).forEach(([type, listener]) => {
            this._element!.addEventListener(type, listener!)
        })
    }

    private _removeEvents() {
        const { events = {} } = this._meta

        Object.entries(events).forEach(([type, listener]) => {
            this._element!.removeEventListener(type, listener!)
        })
    }

    private _makePropsProxy = (props: T): T => new Proxy(props, {
        set: (target, prop, val) => {
            const key = prop as keyof T
            const value = val as T[keyof T]
            if (target[key] !== value) {
                const oldProps = { ...target }

                /* eslint-disable-next-line  no-param-reassign */
                target[key] = value
                this.eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, target)
            }
            return true
        },
        deleteProperty() {
            throw new Error('нет доступа')
        },
    });

    toggleClass(className: string, add: boolean) {
        this._element!.classList.toggle(className, add)
    }

    show() {
        this._element!.classList.remove('hidden')
    }

    hide() {
        this._element!.classList.add('hidden')
    }

    leave() {
        this._element?.remove()
    }
}
