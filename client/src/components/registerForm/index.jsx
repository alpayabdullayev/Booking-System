import React, { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { setUser, setToken } = useContext(UserContext);
  const navigate = useNavigate();

  async function Register(e) {
    try {
      e.preventDefault();
      const response = await axios.post("http://localhost:8000/api/register/", {
        username: username,
        password: password,
        email: email,
      });

      console.log("user yarandi", response.data);
      navigate("/profile");
      const token = response.data.token;
      const decoded = jwtDecode(token);
      setToken(token);
      setUser(decoded);
      console.log("Decoded Token:", decoded);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <section className="py-20">
        <div className="wrapper">
          <div className="max-w-md mx-auto bg-white rounded p-8">
            <h2 className="text-center text-2xl mb-4 font-bold">REGISTER</h2>
            <form onSubmit={Register} className="flex flex-col gap-4">
              <input
                className="border py-2 px-4 border-gray-300 rounded outline-none"
                type="text"
                placeholder="Username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="border py-2 px-4 border-gray-300 rounded outline-none"
                type="email"
                placeholder="Email Address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="border py-2 px-4 border-gray-300 rounded outline-none"
                type="password"
                placeholder="Password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded duration-500 hover:bg-gray-900"
                type="submit"
              >
                REGISTER
              </button>
            </form>
            <p className="text-center mt-4">
              Already have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Back to login
              </span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterForm;
