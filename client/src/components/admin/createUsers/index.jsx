import React, { useContext, useState } from "react";
import axios from "axios"; // axios'ı içe aktar

import { UserContext } from "../../../context/userContext";
import { NavLink, useNavigate } from "react-router-dom";
import Dashboard from "../Dashboard";

const CreateUsers = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [email, setemail] = useState("");
  const { token } = useContext(UserContext);
  const navigate = useNavigate();

  async function createUser(e) {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8000/api/user/",
        {
          username: username,
          password: password,
          role: role,
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/admin/users");
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Dashboard />

      <div className=" flex">
        <div className=" w-2/12"></div>
        <div className="flex justify-center flex-col items-center min-h-screen bg-gray-200  py-10 w-full">
          <h1 className=" text-3xl font-bold pb-10">Create User Page</h1>
          <form
            onSubmit={createUser}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Create User
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateUsers;
