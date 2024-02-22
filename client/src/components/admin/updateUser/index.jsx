import React, { useContext, useEffect, useState } from "react";
import { NavLink, Navigate, useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import { UserContext } from "@/context/userContext";
import Dashboard from "../Dashboard";

const UpdateUser = () => {
  const { id } = useParams();
  const { token } = useContext(UserContext);
  const [user, setUser] = useState({
    username: "",
    role: "",
    password: "",
  });
  const navigate = useNavigate();

  async function getUserById() {
    try {
      const res = await axios.get(`http://localhost:8000/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = res.data;
      setUser({
        username: userData.username,
        role: userData.role,
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserById();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/admin/users");
    try {
      const res = await axios.put(
        `http://localhost:8000/api/user/${id}`,
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("User updated ", res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Dashboard />
      <div className="flex">
        <div className="w-2/12"></div>
        <div className=" bg-gray-200  flex-col flex justify-center items-center w-full min-h-screen">
          <h1 className=" text-3xl font-bold pb-10">Update User Page</h1>

          <form
            onSubmit={handleSubmit}
            className="max-w-sm shadow-lg border py-10 px-14 bg-white mx-auto my-4"
          >
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700">
                Username:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={user.username}
                onChange={handleInputChange}
                className="border w-full px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="role" className="block text-gray-700">
                Role:
              </label>
              <select
                id="role"
                name="role"
                value={user.role}
                onChange={handleInputChange}
                className="border w-full px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={user.password}
                onChange={handleInputChange}
                className="border w-full px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
              >
                Update User
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
