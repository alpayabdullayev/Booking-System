import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import sendEmail from "../EmailJs/index";

const ContactForm = () => {
  const [local, setLocal] = useState("");
  const handleFormSubmit = async (values, { resetForm }) => {
    setLocal(values);

    const templateParams = {
      to_name: "Recipient Name",
      from_name: values.username,
      from_email: values.email,
      from_state: values.state,
      message: "Contact details: " + JSON.stringify(values),
    };

    await sendEmail(templateParams);
    const MySwal = withReactContent(Swal);
    await MySwal.fire({
      title: "Elaqe Uğurla Başa Çatdı!",
      text: "You clicked the button!",
      icon: "success",
    });

    resetForm();
  };
  return (
    <Formik
      initialValues={{ firstName: "", subject: "", message: "", email: "" }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        subject: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Required"),
        message: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
      })}
      onSubmit={handleFormSubmit}
    >
      <Form className="container mx-auto mt-8 max-w-md">
        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="  text-gray-600  text-sm font-bold mb-2"
          >
            Your name
          </label>
          <Field
            name="firstName"
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <ErrorMessage
            name="firstName"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className=" text-gray-600 text-sm font-bold mb-2"
          >
            Your email
          </label>
          <Field
            name="email"
            type="email"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <ErrorMessage
            name="email"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="subject"
            className=" text-gray-600 text-sm font-bold mb-2"
          >
            Subject
          </label>
          <Field
            name="subject"
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <ErrorMessage
            name="subject"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="message"
            className=" text-gray-600 text-sm font-bold mb-2"
          >
            Your message (optional)
          </label>
          <Field
            name="message"
            as="textarea"
            rows="4"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <ErrorMessage
            name="message"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>

        <button
          type="submit"
          className=" bg-blue-500 hover:bg-gray-600 text-white p-2 rounded  duration-500 focus:outline-none"
        >
          Submit
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
