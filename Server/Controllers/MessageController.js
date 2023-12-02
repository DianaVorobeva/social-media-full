import MessageModel from "../Models/messageModel.js";

// add a message

export const addMessage = async (req, res) => {
  const { chatId, senderId, text, image } = req.body;

  const message = new MessageModel({
    chatId,
    senderId,
    text,
    image
  });
  try {
    const result = await message.save();
    
    res.status(200).json(result);
    
  } catch (error) {
    res.status(500).json(error);
  }
};

// fetch messages

export const getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const result = await MessageModel.find({ chatId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete a message 

export const deleteMessage = async(req,res) => {
  const id = req.params.messageId;
  try {
      await MessageModel.findByIdAndDelete(id);
      res.status(200).json("Message deleted successfully!")
  } catch (error) {
      res.status(500).json(error);
  } 
}