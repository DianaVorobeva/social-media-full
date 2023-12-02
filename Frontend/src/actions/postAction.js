import * as PostsApi from "../API/PostRequest";

export const getTimelinePosts = (id) => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    const { data } = await PostsApi.getTimelinePosts(id);
    dispatch({ type: "RETREIVING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_FAIL" });
  }
};

export const addComment = (id, data)=> async(dispatch)=> {
  dispatch({type: "ADD_COMMENT", data: id})
  PostsApi.addComment(id, data)
};

export const deleteComment = (id, data)=> async(dispatch)=> {
  dispatch({type: "DELETE_COMMENT", data: id})
  PostsApi.deleteComment(id, data)
};

export const updateComment = (id, data)=> async(dispatch)=> {
  dispatch({type: "UPDATE_COMMENT", data: id})
  PostsApi.updateComment(id, data)
};