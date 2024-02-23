import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionTitle from "@/components/common/sectionTitle";
import axios from "axios";

const FAQacc = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getAllFaq() {
    try {
      const res = await axios.get("http://localhost:8000/api/faq/");
      setData(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllFaq();
  }, []);

  return (
    <>
      <section className="py-20">
        <div className="wrapper">
          <SectionTitle children={"Frequently asked questions"} />
          <div className="py-10">
            <Accordion
              type="single"
              collapsible
              className="w-full grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                data.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{item.title}</AccordionTrigger>
                    <AccordionContent>{item.description}</AccordionContent>
                  </AccordionItem>
                ))
              )}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQacc;
