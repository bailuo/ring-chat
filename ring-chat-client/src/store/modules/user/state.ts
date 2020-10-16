export interface UserState {
    userId: string;
    username: string;
    nickname: string;
    createdTime: string;
    token: string;
}

const userState: UserState = {
    userId :'',
    username: '',
    nickname: '',
    createdTime:'',
    token:'',
};

export default userState;