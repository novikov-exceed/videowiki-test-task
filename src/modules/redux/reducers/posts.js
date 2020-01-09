import {
  FETCH_ALL_POSTS_SUCCESS,
  FETCH_ALL_POSTS_FAIL,
  FETCH_ALL_POSTS_PROCESS,
  FETCH_LIKE_FROM_SOCKET,
  CREATE_POST_SUCCESS,
  CREATE_POST_PROCESS,
  CREATE_POST_FAIL,
} from '../actionTypes';

const initialState = {
  errors: null,
  posts: [],
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_POST_PROCESS:
    case FETCH_ALL_POSTS_PROCESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_ALL_POSTS_SUCCESS: {
      const { posts } = action.payload;
      return {
        ...state,
        posts: [ ...state.posts, ...posts ],
        loading: false
      };
    }
    case CREATE_POST_FAIL:
    case FETCH_ALL_POSTS_FAIL: {
      const { errors } = action.payload;
      return {
        ...state,
        errors: errors,
        loading: false
      };
    }
    case FETCH_LIKE_FROM_SOCKET: {
      const { likeCounter, dislikeCounter, id } = action.payload;
      const posts = state.posts;
      posts.map(post => {
        if (post.id === id) {
          post.likeCounter = likeCounter;
          post.dislikeCounter = dislikeCounter;
        }
        return post
      });
      return {
        ...state,
        posts: [ ...posts ]
      };
    }
    case CREATE_POST_SUCCESS: {
      const { post } = action.payload;
      return {
        ...state,
        posts: [ post, ...state.posts ],
        loading: false
      };
    }
    default:
      return state;
  }
}
