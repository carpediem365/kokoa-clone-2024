const express = require('express');
const router = express.Router();
const ChatModel = require('../models/ChatModel');
const User = require('../models/user');
// 채팅 목록 페이지 라우트
router.get('/', async (req, res) => {
    try {
        const userId = req.session.user.user_id;
        const friends = await User.getFriendsList(userId);
        const chatRooms = await ChatModel.getUserChatRooms(userId);
        console.log("chatjs: ", userId);
        console.log("chatRooms: ", chatRooms);
        console.log("chatRooms: ", chatRooms[0].participants);
        console.log("친구정보: ", friends);
        res.render('chats', {chatRooms: chatRooms, currentUserId : userId, friends:friends});
        // 채팅 데이터를 불러오는 로직 구현
        // 예: const chats = await ChatModel.getChats();
        // res.render('chatPage', { chats: chats });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/create-chat', async (req, res) => {
    const { friendId } = req.body;
    try {
        const newChatRoomId = await ChatModel.createChatRoom(req.session.user.user_id, friendId);
        res.json({ id: newChatRoomId });
      } catch (error) {
        console.error('채팅방 생성 에러', error);
        res.status(500).send('채팅방 생성 중 에러가 발생했습니다.');
      }
    });


module.exports = router;