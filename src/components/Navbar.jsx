import React from "react";
import { NavLink, Link } from "react-router-dom";
import { BsFillPersonFill, BsFillChatFill } from "react-icons/bs";
import { IoMdLogOut } from "react-icons/io";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const activeLink = "text-dark";
const normalLink = "text-gray-400 hover:text-gray-500";

const Navbar = () => {
  return (
    <div className="fixed  left-0 bottom-0 w-full py-3 bg-gray-100 ">
      <div className="flex justify-around">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          <BsFillPersonFill fontSize={25} />
        </NavLink>
        <NavLink
          to="/chats"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          <BsFillChatFill fontSize={25} />
        </NavLink>
        <Link to="/login" className={normalLink} onClick={() => signOut(auth)}>
          <IoMdLogOut fontSize={25} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
