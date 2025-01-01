import React, { useState } from 'react';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      console.error(err);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-700 via-pink-500 to-red-400">
      <div className="bg-white shadow-xl rounded-3xl p-6 w-96">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
          {isLoginForm ? "Login" : "Sign Up"}
        </h2>
        
        {!isLoginForm && (
          <>
            <input
              type="text"
              placeholder="First Name"
              className="w-full p-3 mb-4 rounded-lg border-2 border-gray-300 focus:border-pink-500 outline-none"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full p-3 mb-4 rounded-lg border-2 border-gray-300 focus:border-pink-500 outline-none"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-lg border-2 border-gray-300 focus:border-pink-500 outline-none"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded-lg border-2 border-gray-300 focus:border-pink-500 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}

        <button
          className="w-full p-3 mb-4 bg-pink-500 text-white font-bold rounded-lg shadow hover:bg-pink-600 transition duration-300"
          onClick={isLoginForm ? handleLogin : handleSignUp}
        >
          {isLoginForm ? "Login" : "Sign Up"}
        </button>

        <p
          className="text-gray-600 text-sm text-center cursor-pointer hover:text-pink-500 transition duration-300"
          onClick={() => setIsLoginForm((value) => !value)}
        >
          {isLoginForm ? "New User? Sign Up Here" : "Existing User? Login Here"}
        </p>
      </div>
    </div>
  );
};

export default Login;
