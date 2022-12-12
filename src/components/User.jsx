import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const User = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="flex items-center gap-3 hover:bg-gray-100 px-4 py-2">
      <img
        src={user.photoURL}
        alt="profile"
        className="w-14 h-14 rounded-full object-contain"
      />
      <p className="text-sm font-bold">{user.displayName}</p>
    </div>
  );
};

export default User;
