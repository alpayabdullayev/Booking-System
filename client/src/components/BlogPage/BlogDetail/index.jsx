import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogCardSkeleton from "../BlogCardSkeleton";
import BlogCard from "../BlogCard";
import axios from "axios";
import {
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";

const BlogDetailSection = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function GetBlogsById() {
    try {
      const res = await axios.get(`http://localhost:8000/api/blogs/${id}`);
      setData(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    GetBlogsById();
  }, []);

  const shareUrl = `http://localhost:5173/hotelDetail/${id}`;
  return (
    <>
      <div className=" grid grid-cols-1 gap-10">
        {isLoading ? <BlogCardSkeleton /> : <BlogCard item={data} {...data} />}
      </div>
      <div className="py-10 ">
        <p className=" text-3xl font-bold">Share Social</p>
        <div className="py-5 flex gap-4">
          <div className="w-10 h-10   text-lg rounded-full  shadow-md border flex  justify-center items-center">
            <span className=" ">
              <WhatsappShareButton
                url={shareUrl}
                quote={"Title or jo bhi aapko likhna ho"}
                hashtag={"#portfolio..."}
              >
                <WhatsappIcon size={40} round={true} />
              </WhatsappShareButton>
            </span>
          </div>
          <div className="w-10 h-10   text-lg rounded-full  shadow-md border flex  justify-center items-center">
            <span className=" ">
              <TwitterShareButton
                url={shareUrl}
                quote={"Title or jo bhi aapko likhna ho"}
                hashtag={"#portfolio..."}
              >
                <TwitterIcon size={40} round={true} />
              </TwitterShareButton>
            </span>
          </div>

          <div className="w-10 h-10   text-lg rounded-full  shadow-md border flex  justify-center items-center">
            <span className=" ">
              <FacebookShareButton
                url={shareUrl}
                quote={"Title or jo bhi aapko likhna ho"}
                hashtag={"#portfolio..."}
              >
                <FacebookIcon size={40} round={true} />
              </FacebookShareButton>
            </span>
          </div>
          <div className="w-10 h-10   text-lg rounded-full  shadow-md border flex  justify-center items-center">
            <span className=" ">
              <EmailShareButton
                url={shareUrl}
                quote={"Title or jo bhi aapko likhna ho"}
                hashtag={"#portfolio..."}
              >
                <EmailIcon size={40} round={true} />
              </EmailShareButton>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetailSection;
