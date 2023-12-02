import PostModel from "../Models/postModel.js";
import UserModel from "../Models/userModel.js";
import mongoose from 'mongoose';

// Create new post

export const createPost = async(req,res) => {
    const newPost = new PostModel(req.body);

    try {
        await newPost.save();
        res.status(200).json(newPost)
    } catch (error) {
        res.status(500).json(error);
    }
}

// Get a post

export const getPost = async(req,res) => {
    const id = req.params.id;

    try {
        const post = await PostModel.findById(id);
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error);
    }
}

// Update post

export const updatePost = async(req,res) => {
    const postId = req.params.id;

    const { userId } = req.body;

    try {
        const post = await PostModel.findById(postId);
        if(post.userId === userId) {
            await post.updateOne( { $set : req.body } );
            res.status(200).json("Post updated");
        } else {
            res.status(403).json("Action forbidden")
        }
        
    } catch (error) {
        res.status(500).json(error);
    }
}

// delete a post 

export const deletePost = async(req,res) => {
    const id = req.params.id;

    const { userId } = req.body;

    try {
        const post = await PostModel.findById(id);

        if(post.userId === userId) {
            await post.deleteOne();
            res.status(200).json("Post deleted");
        } else {
            res.status(403).json("Action forbidden");
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

// like/dislike a post

export const likePost = async (req,res) => {
    const id = req.params.id;
    const { userId } = req.body;
  
    try {
      const post = await PostModel.findById(id);
      
      
      if (!post.likes.includes(userId)) {
        await post.updateOne({ $push: { likes: userId } });
        res.status(200).json("Post liked");
      } else {
        await post.updateOne({ $pull: { likes: userId } });
        res.status(200).json("Post Unliked");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  };
  

// Get timeline posts
export const getTimelinePosts = async (req, res) => {
  const userId = req.params.id
  try {
    const currentUserPosts = await PostModel.find({ userId: userId });

    const followingPosts = await UserModel.aggregate([
      { 
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json(
      currentUserPosts
        .concat(...followingPosts[0].followingPosts)
        .sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
    );
  } catch (error) {
    res.status(500).json(error);
  }
};


  // add comments in post

  export const addComment = async(req,res) => {
    const id = req.params.id;  // post Id
   
    const data = req.body
    try {
      const post = await PostModel.findById(id);
      
      await post.updateOne({ $push: { comments: data } });
      res.status(200).json(data);
      
    } catch (error) {
      res.status(500).json(error);
    }
}

// delete a comment 

export const deleteComment = async(req,res) => {

  const  postId  = req.params.id; //post id
  const { commentId } = req.body; // id of comment
 

  try {
    const post = await PostModel.updateOne({_id: new mongoose.Types.ObjectId(postId)},
      { $pull: { comments: { _id:  new mongoose.Types.ObjectId(commentId)} } }
    );
    res.status(200).json("ok");
    console.log(commentId)
  } catch (error) {
      res.status(500).json(error);
  }
}


// update Comment

export const updateComment = async(req,res) => {
  const id = req.params.id; //post id

  const { commentId, text } = req.body;

  try {
    const post = await PostModel.updateOne( {_id : new mongoose.Types.ObjectId(id), "comments._id" : new mongoose.Types.ObjectId(commentId)} , 
    {$set : {"comments.$.text" : text} });

    res.status(200).json("Comment updated");
  } catch (error) {
      res.status(500).json(error);
  }
}