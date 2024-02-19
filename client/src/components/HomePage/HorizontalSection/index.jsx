import SectionTitle from "@/components/common/sectionTitle";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

const HorizontalSection = () => {
  return (
    <section className=" bg-gray-100 py-10">
      <div className="wrapper">
        <SectionTitle
          children={"Stay Only in our Room"}
          text={
            "Lorem ipsum dolor sit amet consectetur adipiscing elit. Mauris nullam the as integer quam dolor nunc semper."
          }
        />
      </div>
      <HorizontalScrollCarousel />
    </section>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] ">
      <div className="sticky top-0 flex min-h-[90vh] items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }) => {
  return (
    <div
      key={card.id}
      className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200"
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          objectFit: "cover",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
      <div className="absolute inset-0 z-10 grid place-content-center">
        <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-3xl font-black  uppercase text-white backdrop-blur-lg">
          {card.title}
        </p>
      </div>
    </div>
  );
};

export default HorizontalSection;

const cards = [
  {
    url: "https://www.radiustheme.com/demo/wordpress/themes/tripfery/wp-content/uploads/2024/01/Pool-View-Room-min.jpg",
    title: "Villas Room",
    id: 1,
  },
  {
    url: "https://www.radiustheme.com/demo/wordpress/themes/tripfery/wp-content/uploads/2024/01/room-min.jpg",
    title: "Sea View Room",
    id: 2,
  },
  {
    url: "https://www.radiustheme.com/demo/wordpress/themes/tripfery/wp-content/uploads/2024/01/Courtyard-Room-min.jpg",
    title: "Courtyard Room",
    id: 3,
  },
  {
    url: "https://www.radiustheme.com/demo/wordpress/themes/tripfery/wp-content/uploads/2024/01/Suits-Room-min.jpg",
    title: "Suits Room",
    id: 4,
  },
  {
    url: "https://www.radiustheme.com/demo/wordpress/themes/tripfery/wp-content/uploads/2024/01/Lagoon-View-Room-min.jpg",
    title: "Lagoon View Room",
    id: 5,
  },
  {
    url: "https://www.radiustheme.com/demo/wordpress/themes/tripfery/wp-content/uploads/2024/02/room2.jpg",
    title: "Executive Room",
    id: 6,
  },
  {
    url: "https://www.radiustheme.com/demo/wordpress/themes/tripfery/wp-content/uploads/2023/11/7.jpg",
    title: "Monsal Trander",
    id: 7,
  },
];
