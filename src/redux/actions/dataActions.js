import {
  SET_MESSAGES,
  LOADING_DATA,
  LIKE_MESSAGE,
  UNLIKE_MESSAGE,
  DELETE_MESSAGE,
  SET_ERRORS,
  POST_MESSAGE,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_MESSAGE,
  STOP_LOADING_UI,
  SUBMIT_COMMENT
} from "../types";
import axios from "axios";

// Get all messages
export const getMessages = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/messages")
    .then(res => {
      dispatch({
        type: SET_MESSAGES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_MESSAGES,
        payload: []
      });
    });
};
export const getMessage = messageId => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/message/${messageId}`)
    .then(res => {
      dispatch({
        type: SET_MESSAGE,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => console.log(err));
};
// Post a message
export const postMessage = newMessage => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/message", newMessage)
    .then(res => {
      dispatch({
        type: POST_MESSAGE,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
// Like a message
export const likeMessage = messageId => dispatch => {
  axios
    .get(`/message/${messageId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_MESSAGE,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
// Unlike a message
export const unlikeMessage = messageId => dispatch => {
  axios
    .get(`/message/${messageId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_MESSAGE,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
// Submit a comment
export const submitComment = (messageId, commentData) => dispatch => {
  axios
    .post(`/message/${messageId}/comment`, commentData)
    .then(res => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
export const deleteMessage = messageId => dispatch => {
  axios
    .delete(`/message/${messageId}`)
    .then(() => {
      dispatch({ type: DELETE_MESSAGE, payload: messageId });
    })
    .catch(err => console.log(err));
};

export const getUserData = userHandle => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then(res => {
      dispatch({
        type: SET_MESSAGES,
        payload: res.data.messages
      });
    })
    .catch(() => {
      dispatch({
        type: SET_MESSAGES,
        payload: null
      });
    });
};

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
