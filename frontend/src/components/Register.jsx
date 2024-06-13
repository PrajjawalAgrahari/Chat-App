import React from "react";
import axios from "axios";
import { useState, useContext } from "react";
import { UserContext } from "../UserContext";

const RegisterAndLoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginOrRegister, setIsLoginOrRegister] = useState("register");

  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);
  async function handleSubmit(e) {
    e.preventDefault();
    const url = isLoginOrRegister === "register" ? "/register" : "/login";
    const { data } = await axios.post(url, { username, password });
    setLoggedInUsername(username);
    setId(data.id);
  }

  return (
    <div className="bg-blue-50 h-screen flex items-center">
      <form className="w-64 mx-auto flex-row mb-12" onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          className="block w-full rounded-sm p-2 mb-2 border"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          className="block w-full rounded-sm p-2 mb-2 border"
        />
        <button className="bg-blue-500 text-white w-full block rounded-sm p-2">
          {isLoginOrRegister === "register" ? "Register" : "Login"}
        </button>
        {isLoginOrRegister === "register" && (
          <div className="text-center mt-2">
            Already a member?
            <button
              onClick={() => setIsLoginOrRegister("login")}
              className="text-blue-500"
            >
              {" "}
              Login here
            </button>
          </div>
        )}
        {isLoginOrRegister === "login" && (
          <div className="text-center mt-2">
            Don't have an account?
            <button
              onClick={() => setIsLoginOrRegister("register")}
              className="text-blue-500"
            >
              {" "}
              Register
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default RegisterAndLoginForm;
