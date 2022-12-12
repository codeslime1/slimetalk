import React, { useState, useContext } from "react";
import { BsImage } from "react-icons/bs";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { user } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const sendMessage = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      await uploadBytesResumable(storageRef, img).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: user.uid,
              date: Timestamp.now(),
              img: downloadURL,
            }),
          });
        });
      });
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: user.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.friend.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  return (
    <div className="fixed w-full bottom-0 bg-white p-2 flex">
      <input
        type="text"
        placeholder="채팅을 입력해주세요"
        onChange={(e) => setText(e.target.value)}
        value={text}
        className="flex-1 outline-none"
      />
      <div className="flex items-center gap-3">
        <input
          type="file"
          className="hidden"
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label
          htmlFor="file"
          className="text-gray-400 cursor-pointer hover:text-gray-600"
        >
          <BsImage fontSize={20} />
        </label>
        <button
          className="bg-secondary p-2 rounded-md hover:bg-opacity-70"
          onClick={sendMessage}
        >
          전송
        </button>
      </div>
    </div>
  );
};

export default Input;
