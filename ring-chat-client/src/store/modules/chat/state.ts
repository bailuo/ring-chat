
import { UserMessage} from './types';
import { User} from '@/store/modules/user/types';
export interface ChatState  {
    // 当前对话，如果有时间做对话切换
    currentRoom: string;
    // 对话窗口列表
    rooms: Array<string>;
    // 消息列表
    messages: Array<UserMessage>;
    // 当前聊天的人
    participants: Array<User>;
    // 当前聊天使用的socket
    chatSocket?: SocketIOClient.Socket;
}
const chatState: ChatState = {
    currentRoom : '',
    rooms:[],
    messages: [],
    participants:[],
    chatSocket: undefined
};

export default chatState;