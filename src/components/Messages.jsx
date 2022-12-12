import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import Message from "./Message";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <div className="flex flex-col pt-[80px] pb-[55px] px-4">
      {messages.map((message) => (
        <Message message={message} key={message.id} />
      ))}
    </div>
  );
};

export default Messages;
