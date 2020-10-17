import { GetterTree } from 'vuex';
import { ChatState } from './state';
import { RootState } from '../../index';


const getters: GetterTree<ChatState, RootState> = {
    messages(state) {
      return state.messages;
    }
  };
  
  export default getters;