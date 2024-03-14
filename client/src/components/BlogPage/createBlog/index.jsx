import React, { useContext, useState } from "react";
import axios from "axios"; // axios eklemeyi unutmayın
import { FaPhotoFilm } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@/context/userContext";
import AddYourBlog from "../addYourBlog";
import AboutHero from "@/components/AboutPage/hero";
import RecentPost from "../recentBlog";
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

import toast from "react-hot-toast";

const CreateBlogSection = () => {
  const [blogData, setBlogData] = useState({
    title: "",
    text: "",
    status: "",
    images: [],
    mainImage: null,
  });

  const navigate = useNavigate();
  const { userId } = useContext(UserContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };

  const handleMainImageChange = (e) => {
    const mainImage = e.target.files[0] || null;
    setBlogData({ ...blogData, mainImage });
  };

  const handleImagesChange = (e) => {
    const images = Array.from(e.target.files);
    setBlogData({ ...blogData, images });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (let key in blogData) {
        if (key === "images") {
          for (let i = 0; i < blogData.images.length; i++) {
            formData.append("images", blogData.images[i]);
          }
        } else {
          formData.append(key, blogData[key]);
        }
      }

      formData.append("user", userId);

      await axios.post("http://localhost:8000/api/blogs/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Create Blog");
      navigate("/blogs");
    } catch (error) {
      console.error("Blog oluşturma hatası:", error);
      toast.error("Blog oluşturma sırasında bir hata oluştu!");
    }
  };

  return (
    <section className="py-20 min-h-screen">
      <div className="wrapper">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 flex flex-col gap-10 lg:col-span-7">
            <form onSubmit={handleSubmit}>
              <div className="space-y-12">
                <div className="pb-12">
                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">
                      Blog Title:
                    </label>
                    <input
                      className="border w-full p-2"
                      type="text"
                      name="title"
                      value={blogData.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">
                      Blog Status:
                    </label>
                    <input
                      className="border w-full p-2"
                      type="text"
                      name="status"
                      value={blogData.status}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">
                      Blog Text:
                    </label>
                    <textarea
                      className="border w-full p-2"
                      name="text"
                      value={blogData.text}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-6">
                      <label
                        htmlFor="file-upload"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Images photo
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
                                onChange={handleImagesChange}
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
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-6">
                      <label
                        htmlFor="main-image-upload"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Main Image photo
                      </label>
                      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                          <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label
                              htmlFor="main-image-upload"
                              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="main-image-upload"
                                name="main-image-upload"
                                type="file"
                                className="sr-only"
                                onChange={handleMainImageChange}
                                accept="image/*"
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

                  <AlertDialog>
                    <AlertDialogTrigger>
                      <div className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                        Create Blog
                      </div>
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
                          <button
                            type="submit"
                            className=""
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSubmit(e);
                            }}
                          >
                            Blog Create
                          </button>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </form>
          </div>

          <div className="col-span-12  lg:col-span-5">
            <div className=" sticky top-5">
              <RecentPost />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateBlogSection;
