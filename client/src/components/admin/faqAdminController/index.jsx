import { UserContext } from "@/context/userContext";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dashboard from "../Dashboard";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { RxUpdate } from "react-icons/rx";
import { HashLoader } from "react-spinners";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@radix-ui/react-alert-dialog";
import { AiOutlineDelete } from "react-icons/ai";
import {
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";

const FaqAdminController = () => {
  const [faq, setfaq] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(UserContext);
  const navigate = useNavigate();

  async function gelAllUsers() {
    try {
      const res = await axios.get("http://localhost:8000/api/faq/");

      setfaq(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log("Token:", token);
    gelAllUsers();
  }, [token]);

  async function HotelDelete(faqId) {
    try {
      await axios.delete(`http://localhost:8000/api/faq/${faqId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let updateUser = faq.filter((item) => item._id !== faqId);
      setfaq(updateUser);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Dashboard />
      <div className=" px-10 py-3 flex">
        <div className=" w-2/12"></div>
        <main className=" w-full min-h-screen bg-gray-200  px-20 ">
          <div className=" flex py-5 items-center justify-between flex-wrap">
            <div className=" flex flex-wrap gap-4 py-5"></div>
            <div>
              <div>
                <Link to={"/admin/hotel/create  "}>
                  <button className=" py-2 rounded-md px-2 bg-blue-600 text-white">
                    Add FAQ
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

                  <th className="py-2 px-4 border border-gray-300">Title</th>
                  <th className="py-2 px-4 border border-gray-300">
                    Description
                  </th>
                  <th className="py-2 px-4 border border-gray-300 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <div className="flex justify-center w-full  items-center ">
                    <HashLoader color="#183ee7" />
                  </div>
                ) : (
                  faq &&
                  faq.map((item) => (
                    <tr key={item._id}>
                      <td className="py-2 px-4 border border-gray-300">
                        {item._id}
                      </td>
                      <td className="py-2 capitalize px-4 border border-gray-300">
                        {item.title}
                      </td>
                      <td className="py-2 px-4 border border-gray-300">
                        {item.description}
                      </td>

                      <td className="py-2 px-4 border border-gray-300">
                        {" "}
                        <AlertDialog>
                          <AlertDialogTrigger>
                            <button className="bg-red-500 text-white py-1 px-2 rounded-md mr-2">
                              <FaTrash />
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                You are sure to delete?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                If you delete it, you can't get it back
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => HotelDelete(item._id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        <button
                          className="bg-blue-500 text-white py-1 px-2 rounded-md"
                          onClick={() => navigateUpdate(item._id)}
                        >
                          <RxUpdate />
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

export default FaqAdminController;
