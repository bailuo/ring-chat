import { GetterTree } from 'vuex';
import { UserState } from './state';
import { RootState } from '../../index';

const getters: GetterTree<UserState, RootState> = {
    userId(state) {
      return state.userId;
    },
    username(state) {
      return state.username;
    },
    nickname(state) {
      return  state.nickname;
    },
  };
  
  export default getters;