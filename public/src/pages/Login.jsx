import React, { useState, useEffect } from "react";
import { loginRoute } from "../utils/APIRoute";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";



const Login = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem("ChatAppUser")) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          "ChatAppUser",
          JSON.stringify(data.user)
        );

        navigate("/");
      }
    }
  };

  return (
    <div className="bg-[#31024d] flex justify-center items-center w-full h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-[#4e037a] shadow-lg shadow-purple-500/50 flex flex-col gap-5 px-10 py-[5%] rounded-xl"
      >
        <h2 className="font-bold text-2xl text-center text-white">Chat App</h2>
        <h2 className="font-bold text-center text-white">Login</h2>
        <input
          className="Input_Field"
          required
          type="text"
          placeholder="Username"
          name="username"
          onChange={(e) => handleChange(e)}
        />
        <input
          className="Input_Field"
          required
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handleChange(e)}
        />
        <button className="Input_Field bg-purple-600 text-white" type="submit">
          Login
        </button>
        <span className="text-white">
            Don't have an account ? <Link className="text-green-500" to="/register">Create One.</Link>
          </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login