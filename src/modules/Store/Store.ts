import { callbackType, EventBus } from '../EventBus'
import { cloneDeep } from '@utils/cloneDeep'
import { memoize } from '@utils/memoize'
import { IStore } from './types'

const _initialState: IStore = {
    userId: null,
    user: null,
    token: null,
    chats: [],
    usersChat: {
        data: [],
        allLoad: false,
    },
    searchUsersChat: [],
    activeChat: null,
    messages: {
        data: [],
        allLoad: false,
    },
}

type SetState = Partial<IStore> | ((state: IStore) => Partial<IStore>)

export class Store {
    static __instance: Store | null = null

    static EVENT: string = 'FLOW_CHANGE_STORE'

    state: IStore | undefined

    eventBus: EventBus | undefined;

    constructor(initialState = _initialState) {
        this.state = this._makePropsProxy(initialState)
        this.eventBus = new EventBus()
        this._registerEvents()
    }

    static init() {
        Store.__instance = new Store()
    }

    static setState(state: SetState) {
        const newState = typeof state === 'function' ? state(Store.__instance!.state!) : state
        Object.assign(Store.__instance!.state, newState)
    }

    private _registerEvents() {
        this.eventBus!.on(Store.EVENT, (target: any, key: string) => {
            this.eventBus!.emitIsExist(key, target)
        })
    }

    proxyHandler: ProxyHandler<any> = {
        get: (target: IStore, key: keyof IStore) => {
            if (typeof target[key] === 'object' && target[key] !== null) {
                return new Proxy(target[key], this.proxyHandler)
            }
            return target[key]
        },
        set: (target, prop, val) => {
            const key = prop as string
            /* eslint-disable-next-line  no-param-reassign */
            target[key] = val
            this.eventBus!.emit(Store.EVENT, target, key)
            return true
        },
        deleteProperty() {
            throw new Error('нет доступа')
        },
    }

    static addListenerForProps(key: keyof IStore, callback: callbackType) {
        Store.__instance?.eventBus?.on(key, callback)
    }

    static removeListenerForProps(key: keyof IStore, callback: callbackType) {
        Store.__instance?.eventBus?.off(key, callback)
    }

    private _makePropsProxy = (state: IStore) => new Proxy(state, this.proxyHandler);

    static getState() {
        return cloneDeep(Store.__instance?.state || {})
    }

    static makeSelector<T = any>(...callback: any) {
        // eslint-disable-next-line no-spaced-func, func-call-spacing
        return memoize<any, (state: IStore | any) => T>(() => (state: IStore) => callback
            .reduce((st: unknown, fn: (...args: unknown[]) => unknown) => fn(st), state))()
    }
}
