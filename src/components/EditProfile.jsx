import React, { useState, useContext } from "react";
import { IoMdClose } from "react-icons/io";
import { BiImageAdd } from "react-icons/bi";
import { updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";

const EditProfile = ({ setIsEdit }) => {
  const [error, setError] = useState(false);
  const { user } = useContext(AuthContext);

  const editProfile = async (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    const displayName = e.target[1].value;

    try {
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(auth.currentUser, {
              displayName,
              photoURL: downloadURL,
            });

            await updateDoc(doc(db, "users", user.uid), {
              displayName,
              photoURL: downloadURL,
            });
          } catch (err) {
            setError(true);
          }
        });
      });
    } catch (err) {
      setError(true);
    }

    setIsEdit((prev) => !prev);
  };

  return (
    <div className="absolute top-0 w-screen h-screen z-10 bg-black bg-opacity-40">
      <div className="w-screen h-screen flex justify-center items-center z-2 ">
        <div className="bg-white p-4 w-[260px] flex flex-col">
          <div className="flex justify-between items-center">
            <p className="text-black">프로필 편집</p>
            <IoMdClose
              className="cursor-pointer"
              onClick={() => setIsEdit((prev) => !prev)}
            />
          </div>
          <form
            onSubmit={editProfile}
            className="mt-4 flex flex-col justify-center items-center gap-5"
          >
            <input type="file" className="hidden" id="file" />
            <label
              htmlFor="file"
              className="cursor-pointer flex justify-center"
            >
              <BiImageAdd
                fontSize={40}
                className="rounded-full bg-main text-secondary p-2"
              />
            </label>
            <input
              tpye="text"
              placeholder="이름"
              className="outline-none border-b border-black  text-center"
            />
            <button className="mt-4 text-sm p-2 rounded-md  bg-secondary hover:opacity-80">
              프로필 편집
            </button>
            {error && (
              <p className="mt-4 text-sm text-center text-gray-600">
                입력이 잘못되었습니디.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
