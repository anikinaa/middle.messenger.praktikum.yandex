import {ButtonCircle} from "../../../../components";
import iconDots from "../../../../assets/icons/dots.svg";
import {selectActiveIdChat} from "../../../../modules/Store/selectors/chats";
import {Store} from "../../../../modules";
import {MessengerChatSetting} from "../../../../pages/Messenger/blocks/ChatSetting";

export class AppBarAction extends ButtonCircle{
    constructor() {
        const activeId = selectActiveIdChat(Store.getState())

        super({
            props: {
                icon: iconDots,
            },
            attributes: {
                class: `button-circle__gray ${activeId !== null ? '' : 'hidden'}`,
            },
            events: {
                click: MessengerChatSetting.open
            }
        });

        Store.addListenerForProps('activeChat', () => {
            const activeId = selectActiveIdChat(Store.getState())
            this.element?.classList.toggle('hidden', activeId === null)
        })
    }
}
