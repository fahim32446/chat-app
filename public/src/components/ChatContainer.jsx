import React, { useState, useEffect, useRef } from "react";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoute";
import axios from "axios";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";

const ChatContainer = ({ currentChat, socket }) => {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    const getChat = async () => {
      const data = await JSON.parse(localStorage.getItem("ChatAppUser"));
      const response = await axios.post(recieveMessageRoute, {
        from: data._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    };
    getChat();
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(localStorage.getItem("ChatAppUser"))._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(localStorage.getItem("ChatAppUser"));
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    currentChat && (
      <div className="h-full">
        <div className="flex justify-between items-center p-2">
          <div className="flex justify-start items-center gap-4">
            <img
              className="w-10 rounded-full overflow-hidden"
              src={currentChat.avatarImage}
              alt="avatar"
            />
            <h3>{currentChat.username}</h3>
          </div>

          <Logout />
        </div>
        <div className="max-h-[400px] p-2 text-teal-50 flex flex-col gap-1 overflow-auto">
          {messages.map((message) => {
            return (
              <div ref={scrollRef} key={uuidv4()}>
                <div
                  className={`message ${
                    message.fromSelf ? "flex justify-end" : "flex justify-start"
                  }`}
                >
                  <div className="bg-violet-700 p-1 my-1 rounded-md px-2">
                    <p>{message.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <ChatInput handleSendMsg={handleSendMsg} />
      </div>
    )
  );
};

export default ChatContainer;
