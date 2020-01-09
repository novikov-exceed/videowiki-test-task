import { combineReducers } from "redux";
import users from "./users";
import posts from "./posts";
import auth from "./auth";

export default combineReducers({ auth, posts, users });
