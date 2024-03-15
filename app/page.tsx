'use client'
import { useRouter } from "next/navigation";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { wines } from "@/constants";
import Link from "next/link";
import Image from "next/image";

const MotionLink = motion(Link);

export default function Home() {
  const router = useRouter();
  const [show, setShow] = useState(false)

  const handleCountryClick = (geo: { properties: { NAME: string; }; }) => {
    const countryName = geo.properties.NAME.toLowerCase().replace(/\s+/g, '-');
    setShow(!show)
    setTimeout(() => {
      router.push(`/${countryName}`);
    }, 1000)
  };

  const availableCountries = wines.map(country => country.name);

  return (
    <AnimatePresence>
      <main className={`${show ? "animate-out" : ""}`} key="main">
        <div className="max-h-[750px]">
          <ComposableMap projectionConfig={{ scale: 460, center: [12,30] }}>
            {/* TODO: Change to a globe */}
            <Geographies geography="/europe.geojson">
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography 
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => handleCountryClick(geo)}
                    style={{
                      default: {
                        fill: "#70031E",
                        fillOpacity: "0.85",
                        stroke: "#fff",
                        strokeOpacity: "1",
                        strokeWidth: "0.2",
                        outline: "none"
                      },
                      hover: {
                        fill: "#bbb9b9",
                        stroke: "#70031E",
                        strokeOpacity: "0.8",
                        outline: "none"
                      },
                      pressed: {
                        outline: "none"
                      }
                    }}
                  />
                ))
              }
            </Geographies>
          </ComposableMap>
        </div>
        <div className="px-36">
          <h1 className="text-4xl">Browse our wine collection</h1>
          <ul className="px-6 text-xl">
            {availableCountries.map((country) => (
              <li key={country} className="mt-4 capitalize">
                <MotionLink href={`/${country}`} className="flex items-center gap-4" whileHover={{ x: 10 }}>
                  <span>{country}</span>
                  <Image
                    src="/arrow-right.svg"
                    width={24}
                    height={24}
                    alt="arrow right"
                  />
                </MotionLink>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </AnimatePresence>
  );
}
