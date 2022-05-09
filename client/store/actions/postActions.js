import {
  CREATE_POST,
  RETRIEVE_POST,
  UPDATE_POST,
  DELETE_POST,
  DELETE_ALL_POSTS,
  LIKE_POST,
} from "./types.js";
import PostDataService from "../../api/postServices.js";

export const createPost = (formData) => async (dispatch) => {
  try {
    const res = await PostDataService.create(formData);

    dispatch({
      type: CREATE_POST,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrievePosts = () => async (dispatch) => {
  try {
    const res = await PostDataService.getAll();

    dispatch({
      type: RETRIEVE_POSTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updatePost =
  ({ id, data }) =>
  async (dispatch) => {
    try {
      const res = await PostDataService.update({ id, data });

      dispatch({
        type: UPDATE_POST,
        payload: data,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      return Promis.reject(err);
    }
  };

export const deletePost =
  ({ id, token }) =>
  async (dispatch) => {
    try {
      await PostDataService.delete({ id, token });

      dispatch({ type: DELETE_POST, payload: { id } });
    } catch (err) {
      console.log(err);
    }
  };

export const deleteAllPosts = (token) => async (dispatch) => {
  try {
    const res = await PostDataService.deleteAll(token);

    dispatch({ type: DELETE_ALL_POSTS, payload: res.data });

    return Promis.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const findPostsByTitle = (title) => async (dispatch) => {
  try {
    const res = await PostDataService.findByTitle(title);

    dispatc({ type: RETRIEVE_POSTS, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const likePost = (data) => async (dispatch) => {
  try {
    const res = await PostDataService.like(data);

    dispatc({ type: LIKE_POST, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};
