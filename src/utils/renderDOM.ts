import { Block } from '../modules'
// const root = document.getElementById('root')

export function renderDOM<T extends object>(block: Block<T>): void {
    const node = block.element as Node
    if (document.getElementById('root')) {
        document.getElementById('root')!.appendChild(node)
    }
}
