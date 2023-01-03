import React, { useEffect, useState } from "react";
import axios from "axios";
import Buffer from "buffer";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoute";

const SetProfileImg = () => {
  // const api = `https://api.multiavatar.com/4645646`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([
    "https://www.w3schools.com/howto/img_avatar.png",
    "https://www.w3schools.com/howto/img_avatar2.png",
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const getLocalStorage = async () => {
      if (!localStorage.getItem("ChatAppUser")) navigate("/login");
    };
    getLocalStorage();
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("ChatAppUser"));

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("ChatAppUser", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <img src={loader} />
      ) : (
        <div className="bg-[#131324] flex justify-center items-center h-screen flex-col gap-10">
          <h1 className="text-white text-xl font-semibold">
            Pick an Avatar as your profile picture
          </h1>

          <div className="flex gap-5">
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`w-20 min-h-20 object-cover rounded-full overflow-hidden ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={avatar}
                    alt="w-full h-full"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button
            onClick={setProfilePicture}
            className="text-white p-2 bg-blue-800 rounded-md"
          >
            SET AS PROFILE PICTURE
          </button>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default SetProfileImg;
