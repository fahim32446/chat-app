import React, { useState, useEffect } from "react";
import { registerRoute } from "../utils/APIRoute";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    const { password, username, email } = values;
    if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 7) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("ChatAppUser", JSON.stringify(data.user));
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
        <h2 className="font-bold text-center text-white">Registration</h2>
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
          type="email"
          placeholder="Email"
          name="email"
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
          Register
        </button>
        <span className="text-white">
            Already have an account ? <Link className="text-green-500" to="/login">Login Here</Link>
          </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
