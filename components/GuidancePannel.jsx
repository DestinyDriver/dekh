"use client";
import React, { useRef } from "react";
import { Russo_One, Domine } from "next/font/google";

const anton = Russo_One({ weight: "400", subsets: ["latin"] });
const monoton = Domine({ weight: "400", subsets: ["latin"] });

const GuidancePannel = ({ close }) => {
  const textareaRef = useRef(null);

  const handleInput = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 200) + "px";
    }
  };

  return (
    <div className="w-full h-full bg-neutral-900 opacity-97 overflow-auto z-[100] absolute rounded-sm flex flex-col items-center px-4 py-12 md:px-20 md:py-24">
      <img
        src="/contact/input.svg"
        alt=""
        className="z-0 w-[470px] h-[150px] absolute top-[19.7rem]  opacity-20"
      />

      {/* Cross Icon */}
      <img
        src="/contact/cross.png"
        alt="Close"
        className="w-[40px] h-[40px] opacity-20 absolute z-0 right-[2rem] md:right-[10rem] top-[2rem] md:top-[6rem] hover:animate-spin hover:scale-110 transition-transform duration-300 ease-in-out"
        onClick={() => {
          close(false);
        }}
      />

      {/* Border SVG */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden flex justify-center items-center">
        <img
          src="/contact/askborder.svg"
          alt="Decorative border"
          className="w-auto scale-y-208 h-full transform rotate-90 scale-145 translate-x-1.8 object-cover opacity-20 fill-amber-500"
        />
      </div>

      {/* Title */}
      <div
        className={`${anton.className} text-4xl md:text-6xl text-amber-100 mb-4`}
      >
        <div className="text-center leading-tight flex flex-col justify-center items-center m-0 p-0">
          <div className="shadowed-text2 relative">
            <img
              src="/contact/star.png"
              alt="star"
              className="h-10 w-10 absolute top-4 -left-12 z-0"
            />
            SACRED
            <img
              src="/contact/star.png"
              alt="star"
              className="h-10 w-10 absolute top-4 -right-12 z-0"
            />
          </div>
          <div className="-mt-6.5 shadowed-text2">PATH REVEALED</div>
        </div>
        <div className="text-sm italic text-center text-gray-300 -mt-5 shadowed-text">
          You Have Questions, We Have Answers
        </div>
      </div>

      {/* Body */}
      <div
        className={`${monoton.className} flex flex-col justify-between items-center gap-6 md:gap-2 h-[80%] w-full max-w-5xl px-4 py-2 rounded-xl shadow-xl`}
      >
        {/* Left Divider */}
        <div className="hidden md:block h-[30%] w-[1px] bg-white" />

        {/* Input Field */}
        <div className="relative w-full max-w-xs h-[20%] flex items-center justify-center ">
          <input
            type="text"
            placeholder="Enter Your Question*"
            className="caret-transparent focus:outline-none focus:ring-transparent text-center bg-transparent h-[35px] w-full "
          />
        </div>

        {/* Middle Divider */}
        <div className="hidden md:block h-[30%] w-[1px] bg-white" />

        {/* Ask Button */}
        <div className="relative h-[20%] w-full flex items-center justify-center">
          <img
            src="/contact/ask-button.png"
            alt="Ask"
            className="w-[50px] h-[50px] opacity-20 hover:animate-spin hover:scale-110 transition-transform duration-300 ease-in-out"
            onClick={() => {
              close(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default GuidancePannel;
