import {
  LOGIN_USER,
  REGISTER_USER,
} from '../_actions/types';

export default function UserReduce(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, login: action.payload };

    case REGISTER_USER:
      return { ...state, register: action.payload };

    default:
      return state;
  }
}