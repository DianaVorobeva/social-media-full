import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
    userId: { type: String, required: true },
    desc: String,
    likes: [],
    image: String, 
    comments: [
        { type: mongoose.Schema ({
            userId: String,
            commentatorImage: String,
            commentatorName: String,
            text: String, 
        },{ timestamps: { createdAt: 'created_at' }})
        },
    ]
},
    {timestamps: true}
);

const PostModel = mongoose.model("Post", postSchema);
export default PostModel;

