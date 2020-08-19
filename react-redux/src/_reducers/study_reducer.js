import {
    REGISTER_STUDY
} from '../_actions/types';

export default function (state = {}, action) {
    switch (action.type) {
  
        case REGISTER_STUDY:
          return { ...state, register: action.payload }
    
        default:
          return state;
      }
}