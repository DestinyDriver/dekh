"use client";

import React, { useEffect, useRef, useState } from "react";
import CircleType from "circletype";
import { Monoton, Goblin_One } from "next/font/google"; // or replace with your desired font

import SkullModel from "@/components/SkullModel";
import MessagePannel from "@/components/MessagePannel";
import GuidancePannel from "@/components/GuidancePannel";

const monoton = Goblin_One({ weight: "400", subsets: ["latin"] });

export default function Contact() {
  const textRef = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [msgpannel, setmsgpannel] = useState(false);
  const [guidancepannel, setguidancepannel] = useState(false);

  // Mouse move handler for model
  const handleMouseMove = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - bounds.left) / bounds.width;
    const y = (e.clientY - bounds.top) / bounds.height;
    setMouse({ x: (x - 0.5) * 2, y: (y - 0.5) * 2 }); // normalize to [-1, 1]
  };

  useEffect(() => {
    if (textRef[0].current) {
      new CircleType(textRef[0].current).radius(800); // title
    }
    if (textRef[2].current) {
      new CircleType(textRef[2].current).radius(1000).dir(-1); // footer
    }
    if (textRef[3].current) {
      new CircleType(textRef[3].current).radius(1000).dir(-1); // footer
    }
  }, []);

  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center">
      <div
        className="h-[95%] w-[97%] overflow-hidden rounded-sm flex justify-center items-center relative"
        onMouseMove={(ev) => {
          handleMouseMove(ev);
        }}
      >
        {msgpannel ? <MessagePannel close={setmsgpannel} /> : null}
        {guidancepannel ? <GuidancePannel close={setguidancepannel} /> : null}

        <div
          className={`h-full w-full flex flex-col justify-around items-center relative rounded-lg text-center transition-transform duration-500 ease-in-out   ${msgpannel || guidancepannel ? "scale-132 translate-y-[-10px]" : ""}`}
          id="aboutMainDiv"
        >
          {/* Decorative Corners */}
          <img
            className="absolute top-0 left-0 w-48 h-48 contact-corner "
            src="/contact/corner-tl.png"
          />
          <img
            className="absolute top-0 right-0 w-48 h-48 contact-corner "
            src="/contact/corner-tr.png"
          />
          <img
            className="absolute bottom-0 left-0 w-48 h-48 contact-corner "
            src="/contact/corner-bl.png"
          />
          <img
            className="absolute bottom-0 right-0 w-48 h-48 contact-corner "
            src="/contact/corner-br.png"
          />

          {/* Curved Title */}
          <div className="absolute top-10 w-full flex justify-center pointer-events-none select-none">
            <div
              ref={textRef[0]}
              className={`text-black text-3xl md:text-5xl ${monoton.className} font-extrabold`}
              style={{ textShadow: "2px 2px 6px rgba(255, 215, 0, 0.5)" }} // golden shadow
            >
              Summon Your Thoughts
            </div>
          </div>

          {/* Skull 3D Model */}
          <div className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[100%] flex justify-center items-center">
            <SkullModel mouse={mouse} />
          </div>

          {/* Button Soilders */}
          <div className="absolute z-11 left-70 hover:animate-spin hover:hue-rotate-180 transition-transform duration-300 ease-in-out hover:scale-102">
            <svg
              viewBox="0 0 50 50"
              width="200"
              height="200"
              className="relative"
            >
              <image
                href="/contact/button-left.png"
                x="0"
                y="0"
                width="50"
                height="50"
                preserveAspectRatio="xMidYMid slice"
                className="blurry"
                onClick={() => {
                  setguidancepannel(!guidancepannel);
                }}
              />
              {/* <path d="M9.186 1.199 40.875 1.165 40.875 1.165 40.864 45.75 9.117 45.795Z"  fill="transparent" strokeWidth="0.5" className='blur-xl'/> */}
            </svg>
          </div>

          <div className="absolute z-11 right-70 hover:animate-spin hover:hue-rotate-180  transition-transform duration-300 ease-in-out hover:scale-102">
            <svg
              viewBox="0 0 50 50"
              width="200"
              height="200"
              className="relative"
            >
              {/* <path d="M9.186 1.199 40.875 1.165 40.875 1.165 40.864 45.75 9.117 45.795Z" fill="transparent" stroke="black" strokeWidth="0.5"/> */}
              <image
                href="/contact/button-right.png"
                x="0"
                y="0"
                width="50"
                height="50"
                preserveAspectRatio="xMidYMid slice"
                className="blurry"
                onClick={() => {
                  setmsgpannel(!msgpannel);
                }}
              />
            </svg>
          </div>

          {/* Footer - Curved */}
          <div
            className={`absolute bottom-13 ${monoton.className} select-none w-full  flex justify-center pointer-events-none`}
          >
            <div
              ref={textRef[2]}
              className="text-sm md:text-base lg:text-xl text-black font-semibold"
              style={{ textShadow: "2px 2px 6px rgba(255, 215, 0, 0.5)" }}
            >
              In shadows we scribble, in silence we summon — memories,
            </div>
          </div>

          <div
            className={`absolute bottom-5 ${monoton.className} w-full select-none  flex justify-center pointer-events-none`}
          >
            <div
              ref={textRef[3]}
              className="text-sm md:text-base lg:text-xl text-black font-semibold"
              style={{ textShadow: "2px 2px 6px rgba(255, 215, 0, 0.5)" }}
            >
              thoughts, echoes of what was and whispers of what could be.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
