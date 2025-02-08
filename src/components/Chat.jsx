import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const loggedInUser = useSelector((store) => store.user);
  const userId = loggedInUser?._id;

  // Maintain a single socket instance
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const newSocket = createSocketConnection();
    setSocket(newSocket);

    newSocket.emit("joinChat", { firstName: loggedInUser.firstName, userId, targetUserId });

    newSocket.on("messageReceived", ({ firstName, text }) => {
      console.log(`📩 ${firstName}: ${text}`);
      setMessages((messages)=>[...messages, { firstName, text }]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (!newMessage.trim() || !socket) return;

    socket.emit("sendMessage", {
      firstName: loggedInUser.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };

  return (
    <div className="w-3/4 max-w-lg mx-auto mt-15 border border-gray-600 my-5 h-[70vh] flex flex-col bg-white shadow-lg rounded-lg">
      <h1 className="p-4 border-b border-gray-600 text-lg font-semibold bg-gray-200">
        Let's Chat
      </h1>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div key={index} className={"chat "+(loggedInUser.firstName===msg.firstName?"chat-end":"chat-start")}>
            <div className="chat-header">
            {msg.firstName}
            <time className="text-xs text-gray-300 capacity-30"> 2 hrs ago</time>
            </div>
            <div className="chat-bubble">{msg.text}</div>
             <div className="chat-footer opacity-50">Seen</div>
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
