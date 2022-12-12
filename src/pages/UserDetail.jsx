import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { EditProfile } from "../components";
import { AuthContext } from "../context/AuthContext";
import { MdModeEdit } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

const UserDetail = () => {
  const { user } = useContext(AuthContext);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="w-screen h-screen bg-main">
      <div className="absolute top-0 w-full h-full z-1 bg-black bg-opacity-20">
        <Link to="/" className="absolute top-10 right-10 text-white">
          <IoMdClose fontSize={25} />
        </Link>
        <div className="absolute w-full flex justify-center top-[65%]">
          <div className="flex flex-col items-center justify-center">
            <img
              src={user.photoURL}
              alt="profile"
              className="w-20 h-20 rounded-full object-contain"
            />
            <p className="text-white text-md font-semibold mt-4">
              {user.displayName}
            </p>
            <div
              onClick={() => setIsEdit((prev) => !prev)}
              className="mt-5 flex flex-col gap-2 items-center justify-center cursor-pointer text-white hover:text-gray-100"
            >
              <MdModeEdit fontSize={25} />
              <p className="text-sm">프로필 편집</p>
            </div>
          </div>
        </div>
      </div>
      {isEdit && <EditProfile setIsEdit={setIsEdit} />}
    </div>
  );
};

export default UserDetail;
