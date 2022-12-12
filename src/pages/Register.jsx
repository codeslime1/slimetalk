import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import Logo from "../assets/logo.png";

const inputStyle = "p-2 text-sm outline-none border-b-2 border-gray-100";

const Register = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const createAccount = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, "profile.png");
      getDownloadURL(storageRef).then(async (downloadURL) => {
        try {
          await updateProfile(res.user, {
            displayName,
            photoURL: downloadURL,
          });

          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName,
            email,
            photoURL: downloadURL,
          });

          await setDoc(doc(db, "userChats", res.user.uid), {});
          navigate("/");
          setUser(auth.currentUser);
        } catch (err) {
          setError(true);
          setLoading(false);
        }
      });
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className=" bg-main w-screen h-screen">
      <div className="flex flex-col items-center justify-center h-full">
        <img className="w-24 mb-8" src={Logo} alt="logo" />
        <form className="flex flex-col w-[240px]" onSubmit={createAccount}>
          <input className={inputStyle} type="text" placeholder="이름" />
          <input className={inputStyle} type="email" placeholder="이메일" />
          <input
            className="p-2 text-sm outline-none"
            type="password"
            placeholder="비밀번호"
          />
          <button className="bg-secondary mt-5 text-white py-2">
            가입하기
          </button>
          {loading && (
            <p className="mt-4 text-sm text-center text-gray-600">로딩중...</p>
          )}
          {error && (
            <p className="mt-4 text-sm text-center text-gray-600">
              입력이 잘못되었습니디.
            </p>
          )}
          <p className="mt-4 text-sm text-center text-gray-600">
            이미 계정이 있으신가요?{" "}
            <Link to="/login" className="hover:underline">
              로그인
            </Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
