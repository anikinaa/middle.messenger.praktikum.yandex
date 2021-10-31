import { Block } from '../modules'

export function renderDOM<T extends Block<any>>(PageBlock: {
    new (): T;
}): void {
    const root = document.getElementById('root')
    root!.innerHTML = ''
    const item = new PageBlock()
    const node = item.element as Node
    root!.appendChild(node)
}
