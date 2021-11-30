import { Store, IAsyncStoreState } from '@modules'
import { selectUsersChat } from '@modules/Store/selectors/chatUsers'
import { ChatUsersController } from '@controllers/chatUsers'
import { UserList } from '../../../UserList'

export class ChatSettingUserList extends UserList {
    controller: ChatUsersController

    constructor() {
        const users = selectUsersChat(Store.getState())
        super({
            props: { users },
        })

        Store.addListenerForProps('usersChat', this.updateStore.bind(this))

        this.controller = new ChatUsersController()
        this.controller.eventBus!.on(ChatUsersController.EVENT, this.updateLocalStore.bind(this))

        this.controller.fetchUsers()?.then()
    }

    updateStore() {
        const users = selectUsersChat(Store.getState())
        this.setProps({ users })
    }

    updateLocalStore({ isLoading }: IAsyncStoreState) {
        this.element?.classList.toggle('loading', isLoading)
    }

    componentWillUnmount() {
        Store.removeListenerForProps('usersChat', this.updateStore.bind(this))
        this.controller.eventBus!.off(ChatUsersController.EVENT, this.updateLocalStore.bind(this))
    }
}
