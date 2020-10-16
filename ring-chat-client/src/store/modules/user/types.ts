export interface User {
    userId: string;
    username: string;
    nickname: string;
    createdTime: string;
    token: string;
}


export interface ServerRes {
    code: number;
    msg: string;
    data: any;
}


export interface SeverSystemRes {
    message: string;
}