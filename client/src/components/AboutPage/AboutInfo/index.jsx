import React from "react";

const AboutInfo = () => {
  return (
    <>
      <section className="py-20 ">
        <div className="wrapper">
          <div className="text-left ">
            <h1 className="[font-size:_clamp(1em,2vw,5em)] font-bold">
              About the company
            </h1>
            <p className=" w-full md:w-10/12 py-5 text-gray-600">
              A traveller website booking system is an online platform designed
              to facilitate reservations for travel-related services such as
              flights, hotels, rental cars, activities, and more. These systems
              serve as intermediaries between travellers and service providers,
              offering a convenient way to search, compare, and book travel
              arrangements. Key features of a traveller website booking system
              typically include:
            </p>
          </div>
          <div className="  grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h5 className=" font-bold  text-xl">Our mission</h5>
              <p className=" py-5 text-gray-600 leading-6 w-full md:w-10/12">
                Your mission as a traveller website booking system could be
                something like: "To empower travellers worldwide by providing
                them with a seamless and personalized booking experience. We
                strive to offer a comprehensive platform that enables travellers
                to discover, plan, and book their dream vacations with ease. Our
                mission is to make travel accessible, affordable, and enjoyable
                for everyone, while fostering trust, transparency, and
                reliability in the booking process. We are committed to
                constantly innovating and improving our services to exceed the
                expectations of our customers and partners, and to contribute
                positively to the global travel community.".
              </p>
              <ul className="text-gray-600 flex flex-col gap-2  ">
                <li>Excepteur sint occaecat cupidatat non proident.</li>
                <li>Quis autem vel eum iure reprehende qui in ea.</li>
                <li>At vero eos accusamus iusto odio dignissimos.</li>
              </ul>
            </div>
            <div>
              <h5 className=" font-bold text-xl ">Our mission</h5>
              <p className=" py-5 text-gray-600 leading-6 w-full md:w-11/12">
                Your mission as a traveller website booking system could be
                something like: "To empower travellers worldwide by providing
                them with a seamless and personalized booking experience. We
                strive to offer a comprehensive platform that enables travellers
                to discover, plan, and book their dream vacations with ease. Our
                mission is to make travel accessible, affordable, and enjoyable
                for everyone, while fostering trust, transparency, and
                reliability in the booking process. We are committed to
                constantly innovating and improving our services to exceed the
                expectations of our customers and partners, and to contribute
                positively to the global travel community."
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutInfo;
