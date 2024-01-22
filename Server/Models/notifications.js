import mongoose from "mongoose";

const notificationsSchema = mongoose.Schema(
    {
        chatId: {
            type: String
        },
        senderId: {
            type: String
        },
        receiverId: {
            type: String
        },
        events: {
            type: String
        },
        unread: {
            type: Boolean
        }
},
    {timestamps: true}
);

const NotificationsModel = mongoose.model("Event", notificationsSchema);
export default NotificationsModel;