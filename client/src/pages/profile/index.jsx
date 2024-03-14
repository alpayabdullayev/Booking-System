import { UserContext } from "@/context/userContext";
import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BlogCard from "@/components/BlogPage/BlogCard";
import { FaTrash } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { HashLoader } from "react-spinners";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import BlogCardSkeleton from "@/components/BlogPage/BlogCardSkeleton";
import ProfileSkeleton from "@/components/profile/profileSkeleton";

const Profile = () => {
  const { role, user, userT, userId } = useContext(UserContext);
  const [data, setData] = useState(null);
  const [usermap, setusermap] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    username: "",
    phoneNumber: "",
    email: "",
    password: "",
    avatar: null,
  });

  async function getUserByID() {
    try {
      const res = await axios.get(`http://localhost:8000/api/user/${userId}`);
      setData(res.data);
      setusermap(res.data);
      const userData = res.data;
      console.log("res.data", res.data.username);
      setUserData({
        username: userData.username,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        avatar: userData.avatar,
        password: userData.password,
      });
      console.log("logdu", usermap.username);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function getDeleteBlog(id) {
    try {
      const res = await axios.delete(`http://localhost:8000/api/blogs/${id}`);

      getUserByID();
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await getUserByID();
    };
    fetchData();
  }, []);

  const handleMainImageChange = (e) => {
    const avatar = e.target.files[0] || null;
    setUserData({ ...userData, avatar });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", userData.username);
    formData.append("email", userData.email);
    formData.append("phoneNumber", userData.phoneNumber);
    formData.append("password", userData.password);
    formData.append("avatar", userData.avatar);
    try {
      const res = await axios.put(
        `http://localhost:8000/api/user/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      await getUserByID();
      console.log("User updated ", res.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  // console.log(data);
  // console.log("usermap", usermap);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="  mt-10  w-full bg-white shadow-md rounded-lg">
      <div className="bg-gray-100 py-3 px-10">
        {isLoading ? (
          <>
            <ProfileSkeleton />
          </>
        ) : (
          <div className="flex items-center gap-10">
            <div className="mb-4 ">
              <img
                className="w-52  rounded-full h-52 object-cover"
                src={usermap.avatar}
                alt=""
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-4">
                Hi, {usermap.username}
              </h1>

              <h2 className="text-lg font-semibold mb-2">
                <span className="text-gray-400">Email :</span> {usermap.email}
              </h2>
              <h2 className="text-lg font-semibold mb-2">
                <span className="text-gray-400">Telephone Number :</span>{" "}
                {usermap.phoneNumber}
              </h2>
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <Tabs defaultValue="account">
          <TabsList className="grid w-[400px] grid-cols-3">
            <TabsTrigger value="account">bookings</TabsTrigger>
            <TabsTrigger value="password">Blogs</TabsTrigger>
            <TabsTrigger value="setting">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <div>
              <h1 className=" text-3xl font-bold pt-10 pb-5">Your Bookings</h1>
            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
              {isLoading ? (
                <>
                  <BlogCardSkeleton />
                  <BlogCardSkeleton />
                  <BlogCardSkeleton />
                </>
              ) : (
                data &&
                data.bookings.map((bookingItem) => (
                  <div
                    key={bookingItem._id}
                    className="bg-gray-100 overflow-hidden group rounded-lg p-4 mb-4 shadow-md"
                  >
                    <h3 className="text-lg font-semibold mb-2">
                      {bookingItem?.room?.name}
                    </h3>
                    <div className=" overflow-hidden rounded-md">
                      <img
                        src={bookingItem.hotel.mainImage}
                        className="w-full group-hover:scale-105 duration-300 h-64 object-cover rounded-md mb-2"
                        alt=""
                      />
                    </div>
                    <p className="text-sm text-gray-500 mb-1">
                      Start Time: {bookingItem.start_time}
                    </p>
                    <p className="text-sm text-gray-500 mb-1">
                      End Time: {bookingItem.end_time}
                    </p>
                    <p className="text-sm text-gray-500 mb-1">
                      Total Price: ${bookingItem.total_price}
                    </p>
                    <p className="text-sm text-gray-500 mb-1">
                      Hotel: {bookingItem?.hotel?.name}
                    </p>
                    <p className="text-sm capitalize text-gray-500 mb-1">
                      City: {bookingItem.hotel.city}
                    </p>
                    <p className="text-sm text-gray-500">
                      Email: {bookingItem.user.email}
                    </p>
                    <div className=" py-3">
                      <button className=" py-2 px-2 bg-blue-600 text-white rounded-md">
                        <Link to={`/book/${bookingItem._id}`}>
                          See Your Booking
                        </Link>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
          <TabsContent value="password">
            <div>
              <h1 className=" text-3xl font-bold pt-10 pb-5">Your Blogs</h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2  gap-14">
              {isLoading ? (
                <>
                  <BlogCardSkeleton />
                  <BlogCardSkeleton />
                  <BlogCardSkeleton />
                </>
              ) : (
                data &&
                data.blogs.map((blog) => (
                  <div>
                    <BlogCard item={blog} {...blog.user} />
                    <div className="flex  justify-end  mt-2">
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <button
                            // onClick={() => getDeleteBlog(blog._id)}
                            className=" py-2 px-2 bg-blue-600 text-white rounded-md"
                          >
                            <span>
                              <AiOutlineDelete />
                            </span>
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
                              onClick={() => getDeleteBlog(blog._id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
          <TabsContent value="setting">
            <div>
              <h1 className=" text-3xl font-bold pt-10 pb-5">Settings</h1>
            </div>
            <form action="" onSubmit={handleSubmit}>
              <div className="  w-6/12  items-center">
                <div className="mb-4">
                  <label htmlFor="username" className="block text-gray-700">
                    Username:
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={userData.username}
                    onChange={handleInputChange}
                    className="border w-full px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    className="border w-full px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="phoneNumber" className="block text-gray-700">
                    PhoneNumber:
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={userData.phoneNumber}
                    onChange={handleInputChange}
                    className="border w-full px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-700">
                    Password:
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={userData.password}
                    onChange={handleInputChange}
                    className="border w-full px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  />
                </div>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-6">
                    <label
                      htmlFor="file-upload"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Avatar
                    </label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <div className="text-center">
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              multiple
                              onChange={handleMainImageChange}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <button className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                        Update User
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to update?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          If you proceed with the update, it cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>
                          <button type="submit">Update User</button>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
