import React from "react";
import ContactInfo from "../ContactInfo";
import ContactForm from "../ContactForm";

const ContactContent = () => {
  return (
    <>
      <section id="" className="py-20 bg-light-purple min-h-screen">
        <div className="wrapper">
          <div className="grid grid-cols-1 md:grid-cols-2  items-center">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactContent;
