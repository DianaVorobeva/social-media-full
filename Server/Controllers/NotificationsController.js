import NotificationsModel from "../Models/notifications.js";

// add a notification
export const addEvent = async (req, res) => {
  const { chatId, senderId, receiverId, events, unread } = req.body;

  const newNotification = new NotificationsModel({
    chatId,
    senderId,
    receiverId,
    events,
    unread
  });
  try {
    const result = await newNotification.save();
    
    res.status(200).json(result);
    
  } catch (error) {
    res.status(500).json(error);
  }
};

// fetch notifications

export const getAllNotifications = async (req, res) => {

  try {
    const result = await NotificationsModel.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete a notification 

export const deleteNotification = async(req,res) => {
    const id = req.params.senderId;
    try {
        await NotificationsModel.deleteMany({ senderId: id });
        res.status(200).json("Notification deleted successfully!")
    
    } catch (error) {
        res.status(500).json(error);
    } 
  }