import {UserApi} from "../api/user-api";
import {AsyncStore, errorStateCatch, loading, Store} from "../modules";

export const userApi = new UserApi();

export class UserAvatarController extends AsyncStore{
    constructor() {
        super();
    }

    @errorStateCatch
    @loading
    async changeAvatar(file: File) {
        const formData = new FormData()
        formData.append('avatar', file)
        const {status, response} = await userApi.avatar(formData)
        if (status === 200) {
            Store.setState({
                user: JSON.parse(response)
            })
        } else {
            throw new Error('Ошибка, попробуйте еще раз')
        }
    }


}
