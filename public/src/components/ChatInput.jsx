import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import Picker from "emoji-picker-react";

const ChatInput = ({ handleSendMsg }) => {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const show = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const close = () => {
    if (showEmojiPicker === true) {
      setShowEmojiPicker(false);
    }
  };

  const handleEmojiClick = (emojiObject) => {
    console.log(emojiObject);
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };
  return (
    <div
      onClick={close}
      className="flex justify-between p-1 gap-5 items-center"
    >
      <div className="ml-2 p-2 absolute z-10">
        <BsEmojiSmileFill onClick={show} />
        {showEmojiPicker && (
          <Picker onEmojiClick={handleEmojiClick} searchDisabled height={350} />
        )}
      </div>

      <form
        className="flex gap-3 w-full relative"
        onSubmit={(event) => sendChat(event)}
      >
        <input
          className="w-[90%] rounded-l-lg py-3 text-white outline-none pl-[50px] bg-[#31024d]"
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button
          className="p-4 px-5 rounded-r-lg right-0 bg-orange-800 overflow-hidden absolute"
          type="submit"
        >
          <IoMdSend className="" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
