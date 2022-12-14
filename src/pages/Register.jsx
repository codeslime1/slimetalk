import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import Logo from "../assets/logo.png";
import { BsImage } from "react-icons/bs";

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
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
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
          <input className={inputStyle} type="text" placeholder="??????" />
          <input className={inputStyle} type="email" placeholder="?????????" />
          <input
            className="p-2 text-sm outline-none"
            type="password"
            placeholder="????????????"
          />
          <input className="hidden" type="file" id="file" />
          <label htmlFor="file" className="mt-3 flex gap-2 cursor-pointer">
            <BsImage fontSize={20} />
            <span>????????? ????????? ??????</span>
          </label>
          <button className="bg-secondary mt-5 text-white py-2">
            ????????????
          </button>
          {loading && (
            <p className="mt-4 text-sm text-center text-gray-600">?????????...</p>
          )}
          {error && (
            <p className="mt-4 text-sm text-center text-gray-600">
              ????????? ?????????????????????.
            </p>
          )}
          <p className="mt-4 text-sm text-center text-gray-600">
            ?????? ????????? ????????????????{" "}
            <Link to="/login" className="hover:underline">
              ?????????
            </Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
