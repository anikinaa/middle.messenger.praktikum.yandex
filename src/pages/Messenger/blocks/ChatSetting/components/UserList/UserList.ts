import { IAsyncStoreState, Store } from '../../../../../../modules'
import { selectUsersChat } from '../../../../../../modules/Store/selectors/chatUsers'
import { ChatUsersController } from '../../../../../../controllers/chatUsers'
import {UserList} from '../../../UserList'
import { AuthController } from '../../../../../../controllers/auth'

export class ChatSettingUserList extends UserList{
    controller: ChatUsersController

    constructor() {
        const users = selectUsersChat(Store.getState())
        super({
            props: {users}
        })

        Store.addListenerForProps('usersChat', () => {
            const users = selectUsersChat(Store.getState())
            this.setProps({users})
        })

        this.controller = new ChatUsersController()
        this.controller.eventBus!.on(AuthController.EVENT, ({isLoading}: IAsyncStoreState) => {
            this.element?.classList.toggle('loading', isLoading)
        })

        this.controller.fetchUsers()?.then()
    }
}
