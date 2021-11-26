import { Block } from '../modules/Block'

export function renderDOM(block: Block, selector: string): void {
    const root = document.querySelector(selector)
    const node = block.element as Node
    if (root) {
        root!.appendChild(node)
    }
}
