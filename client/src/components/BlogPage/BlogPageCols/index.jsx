import ContactForm from "@/components/ContactComponents/ContactForm";
import React from "react";
import GetAllBlog from "../getAllBlog";
import { Link } from "react-router-dom";
import AddYourBlog from "../addYourBlog";

const BlogPageCols = () => {
  return (
    <>
      <section className="py-20 min-h-screen">
        <div className="wrapper">
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-12 flex flex-col gap-10 lg:col-span-8">
              <GetAllBlog />
            </div>
            <div className="col-span-12  lg:col-span-4">
              <div className="flex flex-col gap-10 sticky top-3">
                <AddYourBlog />
                <div className=" bg-gray-50 shadow-md py-5 px-5 rounded-lg">
                  <h3 className=" text-center font-bold">Contact</h3>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPageCols;
