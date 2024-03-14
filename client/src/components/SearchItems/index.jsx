import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const HotelImage = ({ src, alt }) => (
  <div className="  col-span-4 h-full w-[100%] overflow-hidden rounded-lg group">
    <img
      src={src}
      alt={alt}
      className="h-full w-full group-hover:scale-105 rounded-lg  object-cover duration-500  "
    />
  </div>
);

const HotelDetails = ({
  name,
  desc,
  city,
  distance,
  type,
  languages,
  title,
}) => (
  <div className="p-6 md:p-8">
    <div className="mb-4">
      <p className="text-gray-600 capitalize">{city}</p>
      <h1 className="text-2xl md:text-3xl font-bold mb-4">{name}</h1>
      <p className="text-gray-700">{desc} </p>
      <p className="text-gray-700">{title} </p>
    </div>
    <div className="flex justify-between items-center">
      <div>
        <p className="text-gray-600">Distance: {distance}</p>

        <div>
          <p className="text-gray-600 capitalize">
            Type: {type.map((type) => type.name)}
          </p>
        </div>
        <p className="text-gray-600">Languange: {languages.join(", ")}</p>
      </div>
    </div>
  </div>
);

const SearchItem = ({ item }) => (
  <div className="container mx-auto py-5 px-4 lg:px-0">
    <div className="grid grid-cols-1 gap-8">
      <div className="grid  grid-cols-1 lg:grid-cols-12 border rounded-lg  shadow-lg">
        <HotelImage src={item.mainImage} alt="Cityscape" />
        <div className="p-4 md:p-6 col-span-8 flex-grow">
          <HotelDetails {...item} />
          <div className="flex justify-end mt-6">
            <div className="text-right">
              <p className="text-gray-800 font-bold text-xl md:text-2xl mb-2">
                ${item.cheapestPrice}
              </p>
              <Link to={`/hotelDetail/${item._id}`}>
                <Button className="py-2 px-4 bg-blue-500 text-white hover:bg-blue-600 transition duration-300 ease-in-out">
                  See availability
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SearchItem;
