import React from "react";
import BlogDetailSection from "../BlogDetail";
import RecentPost from "../recentBlog";
import {
    FacebookShareButton,
    WhatsappShareButton,
    WhatsappIcon,
    FacebookIcon,
  } from "react-share";

const BlogDetailCol = () => {
    
  return (
    <>
      <section>
        <div className="wrapper">
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-12 flex flex-col gap-10 lg:col-span-8">
              <div className=" py-10">
                <BlogDetailSection />
              </div>
            </div>
            <div className="col-span-12 flex flex-col gap-10 lg:col-span-4">
              <div className="flex py-10 flex-col gap-10 sticky top-3">
                <RecentPost />
              </div>
            </div>
          </div>

          
        </div>
      </section>
    </>
  );
};

export default BlogDetailCol;
