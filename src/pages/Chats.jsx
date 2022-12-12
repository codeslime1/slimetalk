import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { Navbar } from "../components";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", user.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    user.uid && getChats();
  }, [user.uid]);

  const selectChat = (friendInfo) => {
    dispatch({ type: "CHANGE_CHAT", payload: friendInfo });
  };

  return (
    <div className="w-screen h-screen overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded  scrollbar-track-white">
      <div className="fixed w-full bg-white p-4 flex items-center">
        <h3 className="font-bold text-lg">채팅</h3>
      </div>
      <div className="flex flex-col pt-[80px] pb-[50px]">
        {Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <Link to="/chat" key={chat[0]}>
              <div
                className="flex gap-3 items-center hover:bg-gray-100 px-4 py-2"
                onClick={() => selectChat(chat[1].friendInfo)}
              >
                <img
                  src={chat[1].friendInfo.photoURL}
                  alt="profile"
                  className="w-12 h-12 rounded-full object-contain"
                />
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold">
                    {chat[1].friendInfo.displayName}
                  </span>
                  <p className="text-xs  text-gray-500">
                    {chat[1].lastMessage?.text}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
      <Navbar />
    </div>
  );
};

export default Chats;
