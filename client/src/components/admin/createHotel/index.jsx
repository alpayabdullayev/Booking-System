import React, { useContext, useEffect, useState } from "react";
import Dashboard from "../Dashboard";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { UserContext } from "@/context/userContext";

const CreateHotel = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useContext(UserContext);

  useEffect(() => {
    const getAllType = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/hoteltype/");
        setData(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    getAllType();
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === "images") {
          Array.from(values[key]).forEach((image) =>
            formData.append(key, image)
          );
        } else {
          formData.append(key, values[key]);
        }
      });

      const response = await axios.post(
        "http://localhost:8000/api/hotels/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      alert("Hotel created successfully!");
    } catch (error) {
      console.error(error.message);
      alert("An error occurred while creating hotel");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Dashboard />
      <div className="flex">
        <div className="w-2/12"></div>
        <div className="w-full min-h-screen bg-gray-200 p-8">
          <Formik
            initialValues={{
              name: "",
              city: "",
              address: "",
              title: "",
              desc: "",
              cheapestPrice: "",
              mapAddress: "",
              hotelStars: "",
              featured: false,
              type: "",
              mainImage: null,
              images: [],
            }}
            validationSchema={Yup.object({
              name: Yup.string()
                .max(50, "Must be 50 characters or less")
                .required("Required"),
              city: Yup.string().required("Required"),
              address: Yup.string().required("Required"),
              title: Yup.string().required("Required"),
              desc: Yup.string().required("Required"),
              cheapestPrice: Yup.number().required("Required"),
              mapAddress: Yup.string().required("Required"),
              hotelStars: Yup.number().required("Required"),
              featured: Yup.boolean().required("Required"),
              type: Yup.string().required("Required"),
              mainImage: Yup.mixed().required("Main image is required"),
              images: Yup.array(),
            })}
            onSubmit={handleSubmit}
          >
            <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              {/* Name */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Name
                </label>
                <Field
                  name="name"
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>
              {/* City */}
              <div className="mb-4">
                <label
                  htmlFor="city"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  City Name
                </label>
                <Field
                  name="city"
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="city"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>
              {/* Address */}
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Address
                </label>
                <Field
                  name="address"
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>
              {/* Title */}
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Title
                </label>
                <Field
                  name="title"
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>
              {/* Description */}
              <div className="mb-4">
                <label
                  htmlFor="desc"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Description
                </label>
                <Field
                  name="desc"
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="desc"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>
              {/* Cheapest Price */}
              <div className="mb-4">
                <label
                  htmlFor="cheapestPrice"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Cheapest Price
                </label>
                <Field
                  name="cheapestPrice"
                  type="number"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="cheapestPrice"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>
              {/* Hotel Stars */}
              <div className="mb-4">
                <label
                  htmlFor="hotelStars"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Hotel Stars
                </label>
                <Field
                  name="hotelStars"
                  type="number"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="hotelStars"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>
              {/* Map Address */}
              <div className="mb-4">
                <label
                  htmlFor="mapAddress"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Map Address
                </label>
                <Field
                  name="mapAddress"
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="mapAddress"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>
              {/* Featured */}
              <div className="mb-4">
                <label
                  htmlFor="featured"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Featured
                </label>
                <Field
                  name="featured"
                  type="checkbox"
                  className="mr-2 leading-tight"
                />
                <ErrorMessage
                  name="featured"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>
              {/* Type */}
              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Type
                </label>
                <Field
                  name="type"
                  as="select"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select a type...</option>
                  {data.map((type) => (
                    <option key={type._id} value={type._id}>
                      {type.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="type"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>
              {/* Main Image */}
              <div className="mb-4">
                <label
                  htmlFor="mainImage"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Main Image
                </label>
                <Field
                  name="mainImage"
                  type="file"
                  className="form-input rounded-md shadow-sm mt-1 block w-full"
                />
                <ErrorMessage
                  name="mainImage"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>
              {/* Images */}
              <div className="mb-4">
                <label
                  htmlFor="images"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Images
                </label>
                <Field
                  name="images"
                  type="file"
                  multiple
                  className="form-input rounded-md shadow-sm mt-1 block w-full"
                />
                <ErrorMessage
                  name="images"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>
              {/* Submit button */}
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default CreateHotel;
