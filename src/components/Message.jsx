import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const userStyle = "flex gap-3 mb-5 flex-row-reverse";
const friendStyle = "flex gap-3 mb-5";
const userMessageStyle = "bg-[#6CE6D9] text-sm p-2 rounded-tr-none rounded-md";
const friendMessageStyle = "bg-white text-sm p-2 rounded-tl-none rounded-md";

const Message = ({ message }) => {
  const { user } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={message.senderId === user.uid ? userStyle : friendStyle}
    >
      {message.senderId !== user.uid && (
        <img
          src={data.friend.photoURL}
          alt=""
          className="w-10 h-10 rounded-full object-contain"
        />
      )}
      <div
        className={
          message.senderId === user.uid
            ? "flex flex-col gap-2 items-end"
            : "flex flex-col gap-2 items-start"
        }
      >
        {message.senderId !== user.uid && (
          <span className="text-xs"> {data.friend.displayName}</span>
        )}
        <p
          className={
            message.senderId === user.uid
              ? userMessageStyle
              : friendMessageStyle
          }
        >
          {message.text}
        </p>
        {message.img && <img className="w-1/2" src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
