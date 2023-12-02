import React, { useEffect } from "react";
import './Posts.css';
import './AdaptivePosts.css';
import { getTimelinePosts } from "../../actions/postAction"
import Post from "../post/Post";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";







const Posts = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);

  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, []);

  if(!posts) return 'No Posts';
  if(params.id) posts = posts.filter((post)=> post.userId===params.id);

  return (
    <div className="posts">
      {posts.length===0 && (<span className="noPosts">No Posts</span>)}
      {loading
        ? "Fetching posts...."
        : posts.map((post, id) => {
          if(posts) {
            return <Post data={post} key={id} />;
          }
            
          })}
    </div>
  );
};

export default Posts;
