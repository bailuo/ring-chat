// 聊天的每条
export interface ChatMessage<T> {
    messageId: string;
    contentType: string;
    content: T;
    createdTimeStamp: string;
}

// TODO check if we can extend an interface,
// TODO check diference between type and interface

export interface SysMessage<T>{
    createdTimeStamp: string;
    content: T;
}


// 聊天
export interface ChatRoom {
    roomId: string;
    createdTimeStamp: string;
    // 窗口信息
    messages: Array<ChatMessage<any>>;
    // 窗口是否是用户当前使用
    isRoomActive: boolean;
}


export interface ServerRes {
    code: number;
    msg: string;
    data: any;
}


export interface SeverSystemRes {
    message: string;
}



// 图片尺寸
export interface  ImageSize {
    width: number;
    height: number;
}

