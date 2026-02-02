"use client";
import React from "react";
import { useRef } from "react";
import { Russo_One, Domine } from "next/font/google";

const anton = Russo_One({ weight: "400", subsets: ["latin"] });
const monoton = Domine({ weight: "400", subsets: ["latin"] });

const MessagePannel = ({ close }) => {
  const textareaRef = useRef(null);

  const handleInput = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto"; // Reset height
      el.style.height = Math.min(el.scrollHeight, 200) + "px"; // Limit to 200px
    }
  };

  return (
    <div className="w-full h-full  bg-neutral-900 opacity-97 overflow-auto z-100 absolute rounded-sm flex flex-col items-center px-4 py-12 md:px-20 md:py-24 ">
      {/* cross img */}

      <img
        src="/contact/cross.png"
        alt="Decorative border"
        className="w-[40px] h-[40px] opacity-20  absolute z-0 right-[10rem] top-[6rem] hover:animate-spin hover:scale-110 transition-transform duration-300 ease-in-out"
        onClick={() => {
          close(false);
        }}
      />

      {/* border img */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden flex justify-center items-center">
        <img
          src="/contact/askborder.svg"
          alt="Decorative border"
          className="w-auto  scale-y-208 h-full transform rotate-90 scale-145 translate-x-1.8 object-cover opacity-20 fill-amber-500"
        />
      </div>

      {/* Title */}
      <div
        className={`${anton.className} text-4xl md:text-6xl text-amber-100 mb-4 `}
      >
        <div className="text-center leading-tight flex flex-col justify-center items-center m-0 p-0 ">
          <div className="shadowed-text2 relative">
            <img
              src="/contact/star.png"
              alt="star"
              className="h-10 w-10 absolute top-4 -left-12 z-0"
            />
            REACH OUT
            <img
              src="/contact/star.png"
              alt="star"
              className="h-10 w-10 absolute top-4 -right-12 z-0"
            />
          </div>
          <div className="-mt-6.5  shadowed-text2">AND MAKE CONTACTS</div>
        </div>
        <div className="text-sm italic text-center text-gray-300 -mt-5 shadowed-text">
          We're curious to know what's on your mind
        </div>
      </div>

      {/* Main Body */}
      <div
        className={`${monoton.className} flex flex-col md:flex-row justify-center items-center gap-6 mt-8 w-full max-w-5xl`}
      >
        {/* Left Section */}
        <div className="flex flex-col items-start w-full md:w-1/2 gap-1 ml-4 ">
          {/* Contact Info */}
          <div
            className={`text-gray-400 text-sm text-left ${monoton.className}  `}
          >
            <div className="font-semibold">DestinyDriver</div>
            <div className="-mt-1">destinydriverx@gmail.com</div>
          </div>

          {/* Inputs */}
          <div
            className={`${monoton.className} flex flex-col  w-full md:w-4/4 mt-2 gap-8 `}
          >
            <input
              type="text"
              placeholder="Name*"
              className="caret-transparent focus:outline-none focus:ring-transparent border-b-1 hover:bg-neutral-950 h-[35px] w-[full]"
            />
            <input
              type="email"
              placeholder="Email*"
              className="caret-transparent focus:outline-none focus:ring-transparent border-b-1 hover:bg-neutral-950 h-[35px] "
            />
            <input
              type="text"
              placeholder="Phone"
              className="caret-transparent focus:outline-none focus:ring-transparent border-b-1 hover:bg-neutral-950 h-[35px] "
            />
            <p className="text-[11px] text-gray-400 mt-12">* mandatory field</p>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block h-full w-[1px] bg-white mx-10 "></div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 flex flex-col items-start justify-between h-[100%] ">
          <textarea
            placeholder="Message*"
            className="caret-transparent focus:outline-none focus:ring-transparent border-b-1 hover:bg-neutral-950 h-[35px] w-[100%] resize-none mt-15 overflow-hidden"
            ref={textareaRef}
            onInput={handleInput}
            rows={1}
          ></textarea>
          <div className="flex justify-between items-center w-[100%] ">
            <div className="text-[11px] text-left text-gray-400">
              By accepting, you accept to our{" "}
              <span className="underline underline-offset-2">
                Privacy Terms
              </span>
            </div>
            <button
              type="submit"
              className="text-sm font-semibold tracking-wide uppercase px-4 py-1 bg-transparent border border-white text-white hover:bg-amber-100 hover:text-black transition-all duration-200 rounded"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagePannel;
