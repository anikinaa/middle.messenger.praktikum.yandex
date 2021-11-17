import { EventBus } from '../EventBus'
import { cloneDeep } from '../../utils/cloneDeep'
import { IAsyncStoreState } from './types'

export abstract class AsyncStore {
    static EVENT:string = 'CHANGE_STORE'

    eventBus: EventBus | undefined;

    initialState:IAsyncStoreState = {
        error: null,
        isLoading: false,
    }

    state: IAsyncStoreState

    protected constructor() {
        this.eventBus = new EventBus()
        this.state = this._makePropsProxy(this.initialState)
    }

    private _makePropsProxy = (state: any) => new Proxy(state, {
        set: (target, prop, val) => {
            const key = prop as any
            // eslint-disable-next-line no-param-reassign
            target[key] = val
            this.eventBus!.emitIsExist(AsyncStore.EVENT, target as IAsyncStoreState)
            return true
        },
        deleteProperty() {
            throw new Error('нет доступа')
        },
    });

    private _setState(state: Partial<IAsyncStoreState>) {
        Object.assign(this.state, state)
    }

    getState() {
        return cloneDeep(this.state || {})
    }

    get isLoading() {
        return this.state.isLoading
    }

    protected onLoading() {
        this._setState({
            isLoading: true,
        })
    }

    protected offLoading() {
        this._setState({
            isLoading: false,
        })
    }

    protected setError(error: string) {
        this._setState({ error })
    }

    protected resetError() {
        this._setState({
            error: null,
        })
    }
}
