
import { UserMessage} from './types';
export interface ChatState  {
    currentRoom: string;
    rooms: Array<string>;
    messages: Array<UserMessage>;
}
const chatState: ChatState = {
    currentRoom : '',
    rooms:[],
    messages: []
};

export default chatState;

// export interface ChatNode<T> {
//     itemId: string;
//     contentType: string;
//     content: T;
//     nextItem: ChatNode<T>;
// }


// export interface Chat<K> {
//     roomId: string;
//     chats: Array<ChatNode<K>>;
// }


// export class StringChartNode implements ChatNode<string> {
//     itemId: string;
//     contentType = 'string';
//     content: string;
//     nextItem: any;

//     constructor(content: string){
//         this.itemId = dayjs().valueOf().toString();
//         this.content = content;
//         this.nextItem = null;
//     }
// }