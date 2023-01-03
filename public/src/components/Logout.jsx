import React from 'react'
import { BiPowerOff } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoute";

const Logout = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    const id = await JSON.parse(
      localStorage.getItem("ChatAppUser")
    )._id;
    const data = await axios.get(`${logoutRoute}/${id}`);
    if (data.status === 200) {
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <div className='rounded-md p-2 hover:bg-red-500 duration-300 cursor-pointer shadow-lg  bg-indigo-600' onClick={handleClick}> <BiPowerOff /></div>
  )
}

export default Logout