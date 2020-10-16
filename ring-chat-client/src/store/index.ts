import Vue from 'vue'
import Vuex, { ModuleTree } from 'vuex'
import user from './modules/user';
import chat from './modules/user';
import { UserState } from './modules/user/state';
import { ChatState } from './modules/chat/state';

Vue.use(Vuex)

export type RootState = {
  user: UserState;
  chat: ChatState;
};


const modules: ModuleTree<RootState> = {
  user,
  chat
};


export default new Vuex.Store({
  modules,
});
