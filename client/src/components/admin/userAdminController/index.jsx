import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dashboard from "../Dashboard";
import { UserContext } from "@/context/userContext";
import axios from "axios";

const UserAdminController = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(UserContext);
  const navigate = useNavigate();

  async function gelAllUsers() {
    try {
      const res = await axios.get("http://localhost:8000/api/user/", {});

      setUser(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log("Token:", token);
    gelAllUsers();
  }, [token]);

  async function userDelete(userId) {
    try {
      await axios.delete(`http://localhost:8000/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let updateUser = user.filter((item) => item._id !== userId);
      setUser(updateUser);
    } catch (error) {
      console.log(error);
    }
  }

  function navigateUpdate(userId) {
    navigate(`/admin/users/${userId}/update`);
  }
  return (
    <>
      <Dashboard />
      <div className=" px-10 py-3 flex">
        <div className=" w-2/12"></div>
        <main className=" w-full min-h-screen bg-gray-200  px-20 ">
          <div className=" flex py-5 items-center justify-between flex-wrap">
            <div className=" flex flex-wrap gap-4 py-5">
              <div>
                <button className=" py-2 rounded-md px-2 bg-blue-600 text-white">
                  A-Z
                </button>
              </div>
              <div>
                <button className=" py-2 rounded-md px-2 bg-blue-600 text-white">
                  Z-A
                </button>
              </div>
              <div>
                <input
                  type="text"
                  className=" py-2 px-2 border border-gray-300  rounded-md"
                  name=""
                  placeholder="Search..."
                  id=""
                />
              </div>
            </div>
            <div>
              <div>
                <Link to={"/admin/users/create"}>
                  <button className=" py-2 rounded-md px-2 bg-blue-600 text-white">
                    Add User
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className=" overflow-auto">
            <table className="border rounded-md w-full border-solid border-gray-300">
              <thead className="">
                <tr className="text-left">
                  <th className="py-2 px-4 border border-gray-300  text-gray">
                    ID
                  </th>
                  <th className="py-2 px-4 border border-gray-300">Username</th>
                  <th className="py-2 px-4 border border-gray-300">Role</th>
                  <th className="py-2 px-4 border border-gray-300 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <p>loading...</p>
                ) : (
                  user &&
                  user.map((item) => (
                    <tr key={item._id}>
                      <td className="py-2 px-4 border border-gray-300">
                        {item._id}
                      </td>
                      <td className="py-2 px-4 border border-gray-300">
                        {item.username}
                      </td>
                      <td className="py-2 px-4 border border-gray-300">
                        {item.role}
                      </td>
                      <td className="py-2 px-4 border border-gray-300">
                        {" "}
                        <button
                          className="bg-red-500 text-white py-1 px-2 rounded-md mr-2"
                          onClick={() => userDelete(item._id)}
                        >
                          delete
                        </button>
                        <button
                          className="bg-blue-500 text-white py-1 px-2 rounded-md"
                          onClick={() => navigateUpdate(item._id)}
                        >
                          update
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
};

export default UserAdminController;
