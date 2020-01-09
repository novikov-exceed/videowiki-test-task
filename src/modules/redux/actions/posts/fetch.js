import {
  FETCH_ALL_POSTS_SUCCESS,
  FETCH_ALL_POSTS_FAIL,
  FETCH_ALL_POSTS_PROCESS,
  FETCH_LIKE_FROM_SOCKET,
} from '../../actionTypes';
import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

export const fetchPosts = ({page = 0, perPage = 3}) => {
  return (dispatch) => {
    dispatch(fetchPostsProcess());
    const token = localStorage.getItem("token");
    return (
      axios
        .get(`${url}/posts?page=${page}&perPage=${perPage}`, {
          headers: { authorization: token },
        })
        .then(response => {
          dispatch(fetchLikes());
          dispatch(fetchPostsSuccess(response.data))
        })
        .catch(error => {
          dispatch(fetchPostsFail(error))
        })
    );
  };
};


export const fetchPostsSuccess = (posts) => {
  return {
    type: FETCH_ALL_POSTS_SUCCESS,
    payload: { posts }
  }
};

export const fetchPostsProcess = (posts) => {
  return {
    type: FETCH_ALL_POSTS_PROCESS,
    payload: {}
  }
};

export const fetchPostsFail = (error) => {
  return {
    type: FETCH_ALL_POSTS_FAIL,
    payload: { error }
  }
};

// Action creator with received function:
export function fetchLikes() {
  return dispatch => dispatch({
    event: 'like',
    handle: data => dispatch({
      type: FETCH_LIKE_FROM_SOCKET,
      payload: data,
    }),
  });
}