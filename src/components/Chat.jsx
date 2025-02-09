import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";  // ✅ Ensure axios is imported
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const loggedInUser = useSelector((store) => store.user);
  const userId = loggedInUser?._id;
  const [socket, setSocket] = useState(null);

  // ✅ Fetch chat history from backend
  const fetchChatMessages = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
        withCredentials: true,
      });
      console.log(response.data.messages);

      const chatMessages = response?.data?.messages.map((msg) => ({
        firstName: msg?.senderId?.firstName,
        lastName: msg?.senderId?.lastName,
        text: msg?.text,  // ✅ Corrected text property
      }));

      setMessages(chatMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // ✅ Fetch messages when component mounts or targetUserId changes
  useEffect(() => {
    if (targetUserId) {
      fetchChatMessages();
    }
  }, [targetUserId]);

  // ✅ Establish socket connection & listen for messages
  useEffect(() => {
    if (!userId) return;

    const newSocket = createSocketConnection();
    setSocket(newSocket);

    newSocket.emit("joinChat", {
      firstName: loggedInUser.firstName,
      userId,
      targetUserId,
    });

    newSocket.on("messageReceived", ({ firstName, lastName, text }) => {
      console.log(`📩 ${firstName}: ${text}`);
      setMessages((prevMessages) => [...prevMessages, { firstName, lastName, text }]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [userId, targetUserId]);

  // ✅ Send message via socket & update UI instantly
  const sendMessage = () => {
    if (!newMessage.trim() || !socket) return;

    const sentMessage = {
      firstName: loggedInUser.firstName,
      lastName: loggedInUser.lastName,
      text: newMessage,
    };

    socket.emit("sendMessage", {
      ...sentMessage,
      userId,
      targetUserId,
    });

   
    setNewMessage("");
  };

  return (
    <div className="w-3/4 max-w-lg mx-auto mt-15 p-5 border border-gray-600 my-5 h-[70vh] flex flex-col bg-white rounded-lg-2xl shadow-lg">
      <h1 className="p-4 border-b border-gray-600 text-lg font-semibold bg-gray-200">
        Let's Chat
      </h1>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div key={index} className={"chat " + (loggedInUser.firstName === msg.firstName ? "chat-end" : "chat-start")}>
  <div className="flex flex-col items-start">
    {/* ✅ Name and Time in the same line */}
    <div className="flex items-center gap-2 text-xs text-gray-500">
      <span>{`${msg.firstName} ${msg.lastName}`}</span>
      <time className="text-gray-400">2 hrs ago</time>
    </div>
    <div className="chat-bubble">{msg.text}</div>
  </div>
</div>

        ))}
      </div>

      <div className="flex items-center gap-2 p-3 border-t border-gray-600 bg-gray-100">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-md outline-none"
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
