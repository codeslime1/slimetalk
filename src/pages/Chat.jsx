import React, { useContext } from "react";
import { Input, Messages } from "../components";
import { ChatContext } from "../context/ChatContext";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="bg-main w-screen h-screen overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded  scrollbar-track-main">
      <div className="fixed w-full bg-main p-4 flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <img
            src={data.friend.photoURL}
            alt="profile"
            className="w-12 h-12 rounded-full object-contain"
          />
          <span className="text-sm">{data.friend.displayName}</span>
        </div>
        <Link to="/chats">
          <IoIosArrowRoundBack fontSize={25} />
        </Link>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
