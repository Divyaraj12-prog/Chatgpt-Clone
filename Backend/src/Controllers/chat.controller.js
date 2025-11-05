const jwt = require('jsonwebtoken');
const ChatModel = require('../models/chat.model');
const MsgModel = require('../models/message.model'); 

async function chatController(req,res) {
  const rawTitle = req.body?.title;
  const title = typeof rawTitle === 'string'
    ? rawTitle
    : (rawTitle && typeof rawTitle === 'object' && typeof rawTitle.title === 'string')
      ? rawTitle.title
      : 'New Chat';

  
  console.log('create chat payload title:', rawTitle, '-> using title:', title);

  const chat = await ChatModel.create({
    title,
    user: req.user._id
  });

  return res.status(201).json({ chat });
}

async function getChatsController(req,res) {
  try {
    const user = req.user;

   
    const chats = await ChatModel.find({ user: user._id }).sort({ updatedAt: -1 }).lean();

    return res.status(200).json({
      message: "Chats fetched successfully",
      chats: chats.map(chat => ({
        _id: chat._id,
        title: chat.title,
        lastactivity: chat.lastactivity,
        user: chat.user,
        messages: Array.isArray(chat.messages) ? chat.messages : []
      }))
    });
  } catch (err) {
    console.error('getChatsController error:', err);
    return res.status(500).json({ message: 'Failed to fetch chats', error: err.message });
  }
}


async function getMessagesController(req, res) {
  try {
    const user = req.user;
    const chatId = req.params.chatId;

   
    const mongoose = require('mongoose');
    if (!mongoose.Types.ObjectId.isValid(chatId)) {
      return res.status(400).json({ message: 'Invalid chat id' });
    }

    
    const chat = await ChatModel.findOne({ _id: chatId, user: user._id }).lean();
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

  
    const messages = await MsgModel.find({ chat: chatId }).sort({ createdAt: 1 }).lean();

    return res.status(200).json({ messages });
  } catch (err) {
    console.error('getMessagesController error:', err);
    return res.status(500).json({ message: 'Failed to fetch messages', error: err.message });
  }
}

module.exports = {
  chatController,
  getChatsController,
  getMessagesController
}