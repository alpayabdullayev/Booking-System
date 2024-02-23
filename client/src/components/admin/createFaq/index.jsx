import React, { useState } from "react";
import Dashboard from "../Dashboard";
import axios from "axios";

const CreateFaq = () => {
  const [faqData, setFaqData] = useState({
    title: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFaqData({ ...faqData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/faq/", faqData);
      alert("FAQ başarıyla oluşturuldu!");
    } catch (error) {
      console.error("FAQ oluşturma hatası:", error);
      alert("FAQ oluşturma sırasında bir hata oluştu!");
    }
  };

  return (
    <>
      <Dashboard />
      <div className="flex">
        <div className="w-2/12"></div>
        <div className="w-full min-h-screen bg-gray-200">
          <div className="w-6/12 mx-auto">
            <h2 className="text-2xl font-bold mb-4">FAQ Oluştur</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                  Faq Title:
                </label>
                <input
                  className="border w-full p-2"
                  type="text"
                  name="title"
                  value={faqData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                  Description:
                </label>
                <input
                  className="border w-full p-2"
                  type="text"
                  name="description"
                  value={faqData.description}
                  onChange={handleInputChange}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                FAQ Oluştur
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateFaq;
