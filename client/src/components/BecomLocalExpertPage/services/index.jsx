import SectionTitle from "@/components/common/sectionTitle";
import React from "react";
import { FiCreditCard, FiMail, FiUser, FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FaAddressBook } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { Button } from "@/components/ui/button";

export const CardServices = () => {
  return (
    <section className="py-10">
      <div className="wrapper">
        <SectionTitle children={"How does it work?"} />
        <div className="py-5">
          <div className="p-4">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2  lg:grid-cols-3 ">
              <Card
                title="Sign up
                "
                subtitle="Praesent dolor sagittis, rhoncus netus bibendum et. Dolor id sed urna netus volutpat tortor."
                href="/login"
                Icon={FiUser}
              />
              <Card
                title="Add your services"
                subtitle="Praesent dolor sagittis, rhoncus netus bibendum et. Dolor id sed urna netus volutpat tortor."
                href="#"
                Icon={FaAddressBook}
              />
              <Card
                title="Get bookings"
                subtitle="Praesent dolor sagittis, rhoncus netus bibendum et. Dolor id sed urna netus volutpat tortor."
                href="#"
                Icon={CiBookmark}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Card = ({ title, subtitle, Icon, href }) => {
  return (
    <Link
      to={href}
      className="w-full p-4 rounded border-[1px] border-slate-300 relative overflow-hidden group bg-white"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />

      <Icon className="absolute z-10 -top-12 -right-12 text-9xl text-slate-100 group-hover:text-blue-400 group-hover:rotate-12 transition-transform duration-300" />
      <Icon className="mb-2 text-2xl text-blue-600 group-hover:text-white transition-colors relative z-10 duration-300" />
      <div>
        <h3 className="font-medium text-lg text-slate-950 group-hover:text-white relative z-10 duration-300">
          {title}
        </h3>
        <p className="text-slate-400 group-hover:text-blue-200 relative z-10 duration-300">
          {subtitle}
        </p>
      </div>
    </Link>
  );
};
