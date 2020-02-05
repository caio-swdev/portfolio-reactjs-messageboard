import {
  SET_MESSAGES,
  LIKE_MESSAGE,
  UNLIKE_MESSAGE,
  LOADING_DATA,
  DELETE_MESSAGE,
  POST_MESSAGE,
  SET_MESSAGE,
  SUBMIT_COMMENT
} from '../types';

const initialState = {
  messages: [],
  message: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
        loading: false
      };
    case SET_MESSAGE:
      return {
        ...state,
        message: action.payload
      };
    case LIKE_MESSAGE:
    case UNLIKE_MESSAGE:
      let index = state.messages.findIndex(
        (message) => message.messageId === action.payload.messageId
      );
      state.messages[index] = action.payload;
      if (state.message.messageId === action.payload.messageId) {
        state.message = action.payload;
      }
      return {
        ...state
      };
    case DELETE_MESSAGE:
      index = state.messages.findIndex(
        (message) => message.messageId === action.payload
      );
      state.messages.splice(index, 1);
      return {
        ...state
      };
    case POST_MESSAGE:
      return {
        ...state,
        messages: [action.payload, ...state.messages]
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        message: {
          ...state.message,
          comments: [action.payload, ...state.message.comments]
        }
      };
    default:
      return state;
  }
}
