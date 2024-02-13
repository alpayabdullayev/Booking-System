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
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
              cons, adipisci velit, sed quia non numquam eius modi ullma tempora
              incidunt ut labore et dolore magnam aliquam quaerat fruitr
              voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem.
              Itaque earum rerum hic tea sapiente delectus, ut aut reiciendis
              voluptatibus.
            </p>
          </div>
          <div className="  grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h5 className=" font-bold  text-xl">Our mission</h5>
              <p className=" py-5 text-gray-600 leading-6 w-full md:w-10/12">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Quis nostrud kemmith exercitation
                ullamco laboris nisi ut aliquip.
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
                Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum. Sed ut
                perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium minima veniam.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutInfo;
