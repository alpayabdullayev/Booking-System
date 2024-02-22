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

const MapStatic = () => {
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
                {"Baku, Gence"}
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
    </>
  );
};

export default MapStatic;
