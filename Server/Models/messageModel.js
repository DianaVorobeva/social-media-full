import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
    {
        chatId: {
            type: String
        },
        senderId: {
            type: String
        },
        text: {
            type: String
        },
        image: {
            type: String
        }, 
        unread: {
            type: Boolean
        }
},
    {timestamps: true}
);

const MessageModel = mongoose.model("Message", messageSchema);
export default MessageModel;