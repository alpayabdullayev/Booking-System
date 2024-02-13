import React, { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Sphere,
  Graticule,
  Annotation,
} from "react-simple-maps";

const geoUrl = "../../../public/features.json";

const MapChart = () => {
  const [data, setData] = useState([]);
  const [zoom, setZoom] = useState(4);
  const [center, setCenter] = useState([15, 50]);

  useEffect(() => {
    csv(`../../../public/data.csv`).then((data) => {
      setData(data);
    });
  }, []);

  return (
    <>
      <section className="py-20  ">
        <div className="wrapper">
          <div className=" grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ">
            <div class=" mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
              <h2 class="text-3xl font-bold tracking-tight text-black sm:text-4xl">
                Boost your productivity. Start using our app today.
              </h2>
              <p class="mt-6 text-lg leading-8 text-gray-600">
                Ac euismod vel sit maecenas id pellentesque eu sed consectetur.
                Malesuada adipiscing sagittis vel nulla.
              </p>
              <div class="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <button class="rounded-md bg-blue-600 text-white px-3.5 py-2.5 text-sm font-semibold  duration-500 shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                  Get started
                </button>
                <button class="text-sm font-semibold leading-6 text-black">
                  Learn more <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>

            <div className="    ">
              <ComposableMap className="bg-blue-500  rounded-3xl text-sm">
                <ZoomableGroup zoom={zoom} center={center} translate={[10, 10]}>
                  <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
                  <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
                  {data.length > 0 && (
                    <Geographies geography={geoUrl}>
                      {({ geographies }) =>
                        geographies.map((geo) => {
                          const d = data.find((s) => s.ISO3 === geo.id);
                          return (
                            <Geography
                              key={geo.rsmKey}
                              geography={geo}
                              fill={
                                d && (d.ISO3 === "AZE" || d.ISO3 === "DEU")
                                  ? "red"
                                  : "#90caf9"
                              }
                            />
                          );
                        })
                      }
                    </Geographies>
                  )}
                  <Annotation
                    subject={[49.8671, 40.4093]}
                    dx={-10}
                    dy={10}
                    connectorProps={{
                      stroke: "black",
                      strokeWidth: 1,
                      strokeLinecap: "round",
                    }}
                  >
                    <text
                      x="-8"
                      textAnchor="end"
                      alignmentBaseline="middle"
                      fill="white"
                      fontWeight="bold"
                    >
                      {"Baku"}
                    </text>
                  </Annotation>
                  <Annotation
                    subject={[10.4515, 51.1657]}
                    dx={-10}
                    dy={10}
                    connectorProps={{
                      stroke: "black",
                      strokeWidth: 1,
                      strokeLinecap: "round",
                    }}
                  >
                    <text
                      x="-8"
                      textAnchor="end"
                      alignmentBaseline="middle"
                      fill="white"
                      fontWeight="bold"
                    >
                      {"Berlin"}
                    </text>
                  </Annotation>
                </ZoomableGroup>
              </ComposableMap>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MapChart;
