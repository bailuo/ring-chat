


export interface Message {
    messageId: string;
    messageType: number; // 0 用户文字消息， 1 用户图片消息， 2 系统消息
    createdTimeStamp: string;
}
// 聊天的每条信息
export interface UserTextMessage extends Message {
    content: string;
}


export interface UserImageMessage extends Message {
    src: string;
}

export type UserMessage = UserTextMessage | UserImageMessage;

export interface SystemMessage extends Message {
    readonly content: string;
}




// 聊天
export interface ChatRoom {
    roomId: string;
    createdTimeStamp: string;
    // 窗口信息
    messages: Array<UserMessage>;
    // 窗口是否是用户当前使用
    isRoomActive: boolean;
}


export interface ServerRes {
    code: number;
    msg: string;
    data: any;
}

