import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { IoMdClose } from "react-icons/io";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Search = ({ setIsActive }) => {
  const [friendName, setFriendName] = useState("");
  const [friend, setFriend] = useState(null);
  const [error, setError] = useState(false);

  const { user } = useContext(AuthContext);

  const searchFriend = async () => {
    const friendQuery = query(
      collection(db, "users"),
      where("displayName", "==", friendName)
    );

    try {
      const querySnapShot = await getDocs(friendQuery);
      if (querySnapShot.empty) {
        setError(true);
        setFriendName("");
        setFriend(null);
      }
      querySnapShot.forEach((doc) => {
        setFriend(doc.data());
        setFriendName("");
        setError(false);
      });
    } catch (err) {
      setError(true);
      setFriendName("");
      setFriend(null);
    }
  };

  const addFriend = async () => {
    const chatId =
      user.uid > friend.uid ? user.uid + friend.uid : friend.uid + user.uid;

    try {
      const res = await getDoc(doc(db, "chats", chatId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", chatId), { messages: [] });

        await updateDoc(doc(db, "userChats", user.uid), {
          [chatId + ".friendInfo"]: {
            uid: friend.uid,
            displayName: friend.displayName,
            photoURL: friend.photoURL,
          },
          [chatId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", friend.uid), {
          [chatId + ".friendInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [chatId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setFriend(null);
    setIsActive((prev) => !prev);
  };

  return (
    <div className="absolute top-0 w-screen h-screen z-1 bg-black bg-opacity-40">
      <div className="w-screen h-screen flex justify-center items-center z-2 ">
        <div className="bg-white p-4 w-[260px] flex flex-col">
          <div className="flex justify-between items-center">
            <p className="text-black">친구 추가</p>
            <IoMdClose
              className="cursor-pointer"
              onClick={() => setIsActive((prev) => !prev)}
            />
          </div>
          <div className="flex mt-4">
            <input
              type="text"
              placeholder="친구 찾기"
              className="flex-1 outline-none border-b border-black mt-4 w-full"
              onChange={(e) => setFriendName(e.target.value)}
              value={friendName}
            />
            <button
              onClick={searchFriend}
              className="text-sm px-2 rounded-md  bg-secondary hover:opacity-80"
            >
              찾기
            </button>
          </div>
          {error && (
            <p className="py-1 text-sm text-red-500">
              친구를 찾지 못했습니다!!
            </p>
          )}
          {friend && (
            <div className="mt-4 p-2 flex items-center gap-3 border-2 border-secondary">
              <img
                className="w-10 h-10 rounded-full"
                src={friend.photoURL}
                alt="friend"
              />
              <p className="text-sm font-bold">{friend.displayName}</p>
            </div>
          )}
          <button
            onClick={addFriend}
            className="mt-4 text-sm py-2 rounded-md  bg-secondary hover:opacity-80"
          >
            친구 추가
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
