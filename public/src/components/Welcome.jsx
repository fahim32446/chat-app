import React, { useState, useEffect } from "react";
import Robot from "../assets/robot.gif";

const Welcome = () => {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const getLocalStorage = async () => {
      setUserName(
        await JSON.parse(localStorage.getItem("ChatAppUser")).username
      );
    };
    getLocalStorage();
  }, []);
  return (
    <div className="flex justify-center items-center flex-col">
      <img className="w-[20rem]" src={Robot} alt="" />
      <h1>
        Welcome, <span className="text-[#dbceff]">{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </div>
  );
};

export default Welcome;
