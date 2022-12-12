import React, { useState, useContext, useEffect } from "react";
import { BsPersonPlus } from "react-icons/bs";
import { Friend, Navbar, User, Search } from "../components";
import { AuthContext } from "../context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const Home = () => {
  const [isActive, setIsActive] = useState(false);
  const [friends, setFriends] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getFriends = () => {
      const unsub = onSnapshot(doc(db, "userChats", user.uid), (doc) => {
        setFriends(doc.data());
      });

      return () => {
        unsub();
      };
    };

    user.uid && getFriends();
  }, [user.uid]);

  return (
    <div className="w-screen h-screen overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded  scrollbar-track-white">
      <div className="fixed w-full bg-white p-4 flex justify-between items-center">
        <h3 className="font-bold text-lg">친구</h3>
        <div
          className="rounded-full hover:bg-gray-50 p-2"
          onClick={() => setIsActive((prev) => !prev)}
        >
          <BsPersonPlus fontSize={25} />
        </div>
      </div>
      <div className="flex flex-col pt-[80px] pb-[50px]">
        <User />

        <p className="px-4 pt-4 pb-2 text-sm text-gray-500">친구</p>
        {Object.entries(friends).map((friend) => (
          <Friend
            key={friend[0]}
            image={friend[1].friendInfo.photoURL}
            displayName={friend[1].friendInfo.displayName}
          />
        ))}
        <Navbar />
      </div>
      {isActive && <Search setIsActive={setIsActive} />}
    </div>
  );
};

export default Home;
