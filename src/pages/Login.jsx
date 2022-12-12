import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import Logo from "../assets/logo.png";
import { auth } from "../firebase";

const inputStyle = "p-2 text-sm outline-none border-b-2 border-gray-100";

const Login = () => {
  const [error, setError] = useState(false);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setUser(auth.currentUser);
      navigate("/");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className=" bg-main w-screen h-screen">
      <div className="flex flex-col items-center justify-center h-full">
        <img className="w-24 mb-8" src={Logo} alt="logo" />
        <form className="flex flex-col w-[240px]" onSubmit={login}>
          <input className={inputStyle} type="email" placeholder="이메일" />
          <input
            className="p-2 text-sm outline-none"
            type="password"
            placeholder="비밀번호"
          />
          <button className="bg-secondary mt-5 text-white py-2">로그인</button>
          {error && (
            <p className="mt-4 text-sm text-center text-gray-600">
              아이디 또는 비밀번호가 잘못되었습니다
            </p>
          )}
          <p className="mt-4 text-sm text-center text-gray-600">
            계정이 없으신가요?{" "}
            <Link to="/register" className="hover:underline">
              회원가입
            </Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
