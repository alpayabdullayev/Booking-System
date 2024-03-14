import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "@/context/userContext";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser, setRole, setToken, setuserId } = useContext(UserContext);
  const navigate = useNavigate();

  async function Login(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        username: username,
        password: password,
      });
      localStorage.setItem("token", response.data.token);
      const decoded = jwtDecode(response.data.token);
      localStorage.setItem("role", decoded.role);
      localStorage.setItem("userId", decoded.userId);
      localStorage.setItem("username", decoded.username);
      setUser(decoded.username);
      setuserId(decoded.userId);
      setToken(response.data.token);
      setRole(decoded.role);
      navigate("/profile");
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setError("Your email is not verified.");
      } else {
        setError("An error occurred while logging in.");
      }
    }
  }

  return (
    <>
      <section className=" py-10">
        <div className="wrapper">
          <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form class="space-y-6" action="#" method="POST" onSubmit={Login}>
                <div>
                  <label
                    for="email"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Username
                  </label>
                  <div class="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      autocomplete="email"
                      required
                      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div class="flex items-center justify-between">
                    <label
                      for="password"
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <div class="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="text"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autocomplete="current-password"
                      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {error && <div className="text-red-500">{error}</div>}

                <div>
                  <button
                    type="submit"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
              </form>

              <p class="mt-10 text-center text-sm text-blue-500">
                <Link to={"/register"}> Not a member?</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginForm;
