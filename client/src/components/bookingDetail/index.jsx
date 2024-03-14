import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SectionTitle from "../common/sectionTitle";
import { ReactToPrint } from "react-to-print";
import { Helmet } from "react-helmet-async";
import QRCodeComponent from "../common/QR";

const BookingDetailSection = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const componentRef = useRef();

  async function getBokkingById() {
    try {
      const res = await axios.get(`http://localhost:8000/api/book/${id}`);
      setData(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getBokkingById();
  }, []);

  const url = `http://localhost:5173/book/${id}`;
  return (
    <>
      <Helmet>
        <title>Travellers — Your Booking Detail Check</title>
        <meta name="title" content="Travellers — Your Booking Detail Check" />
        <meta
          name="description"
          content="With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://metatags.io/" />
        <meta
          property="og:title"
          content="Travellers — Your Booking Detail Check"
        />
        <meta
          property="og:description"
          content="With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!"
        />
        <meta
          property="og:image"
          content="https://metatags.io/images/meta-tags.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://metatags.io/" />
        <meta
          property="twitter:title"
          content="Travellers — Your Booking Detail Check"
        />
        <meta
          property="twitter:description"
          content="With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!"
        />
        <meta
          property="twitter:image"
          content="https://metatags.io/images/meta-tags.png"
        />
      </Helmet>
      <section className=" min-h-screen py-10">
        <div className=" wrapper">
          <SectionTitle children={"Check"} />
          <div className=" py-5">
            <button className=" py-2 px-2 bg-blue-600 text-white rounded-md ">
              <ReactToPrint
                trigger={() => {
                  return <button>Print The Booking Check</button>;
                }}
                content={() => componentRef.current}
                documentTitle="Print Hotel Rezervation check"
                pageStyle={"print"}
              />
            </button>
          </div>
          <div ref={componentRef} className=" flex flex-col gap-4">
            <div className=" grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className=" overflow-hidden group">
                <img
                  className=" group-hover:scale-105 duration-300  h-full rounded-md"
                  src={data?.hotel?.mainImage}
                  alt=""
                />
              </div>

              <div>
                <QRCodeComponent url={url} />
              </div>
            </div>
            <div className=" px-3">
              <h3 className="text-lg  font-bold mb-2">
                <span className=" text-gray-600">Room :</span>
                {data?.room?.name}
              </h3>

              <h3 className="text-lg  font-bold mb-2">
                Hotel : {data?.hotel?.name}
              </h3>
              <h3 className="text-lg  font-bold mb-2">
                User : {data?.user?.username}
              </h3>
              <h3 className="text-lg  font-bold mb-2">
                Email : {data?.user?.email}
              </h3>
              <span className=" text-gray-600">Date</span>
              <div className=" flex gap-4">
                <h3 className="text-lg  mb-2">{data?.start_time}</h3>-
                <h3 className="text-lg  mb-2">{data?.end_time}</h3>
              </div>
              <h3 className="text-lg  mb-2">
                Total Price : ${data?.total_price}
              </h3>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BookingDetailSection;
