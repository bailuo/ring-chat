export {};
declare global {
// 聊天的每条
interface ChatMessage<T> {
    messageId: string;
    contentType: string;
    content: T;
    createdTimeStamp: string;
}

// TODO check if we can extend an interface,
// TODO check diference between type and interface

interface SysMessage<T>{
    createdTimeStamp: string;
    content: T;
}


// 聊天
 interface ChatRoom {
    roomId: string;
    createdTimeStamp: string;
    // 窗口信息
    messages: Array<ChatMessage<any>>;
    // 窗口是否是用户当前使用
    isRoomActive: boolean;
}


interface ServerRes {
    code: number;
    msg: string;
    data: any;
}


interface SeverSystemRes {
    message: string;
}



// 图片尺寸
interface  ImageSize {
    width: number;
    height: number;
}

}