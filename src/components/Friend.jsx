import React from "react";

const Friend = ({ image, displayName }) => {
  return (
    <div className="flex items-center gap-3 hover:bg-gray-100 px-4 py-2">
      <img
        src={image}
        alt="profile"
        className="w-10 h-10 rounded-full object-contain"
      />
      <p className="text-sm font-bold">{displayName}</p>
    </div>
  );
};

export default Friend;
