"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import localFont from "next/font/local";
import gsap from "gsap";
import { ArrowRight } from "iconoir-react";
// import { useGSAP } from "@gsap/react";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const amaticaSC = localFont({
  src: "../public/fonts/AmaticaSC/AmaticaSC-Regular.ttf",
  display: "swap",
});

const Hero = () => {
  const [isPause, setisPause] = useState(false);
  const [logoRotation, setlogoRotation] = useState(360);
  const containerSelection = useRef(null);
  const iconSelection = useRef(null);
  const textSelection = useRef(null);
  const logoTween = useRef(null);

  useGSAP(() => {
    gsap.to(".hero-img", {
      y: -20,
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: "sine.inOut",
    });

    logoTween.current = gsap.to(".logo", {
      rotation: "+=360",

      repeat: -1,
      duration: 12,
      ease: "linear",
    });
  }, []);

  useGSAP(() => {
    const container = containerSelection.current;
    const icon = iconSelection.current;
    const text = textSelection.current;

    const hoverTl = gsap.timeline({ paused: true });

    hoverTl
      .to(icon, {
        x: 116,
        rotateZ: 180,
        duration: 0.4,
        ease: "power3.out",
      })
      .to(
        text,
        {
          x: -37,
          duration: 0.4,
          ease: "power3.out",
        },
        "<"
      );

    container.addEventListener("mouseenter", () => hoverTl.play());
    container.addEventListener("mouseleave", () => hoverTl.reverse());

    return () => {
      container.removeEventListener("mouseenter", () => hoverTl.play());
      container.removeEventListener("mouseleave", () => hoverTl.reverse());
    };
  }, []);

  return (
    <div className="bg-[var(--background-color)] flex flex-col items-center  ">
      {/* Hero Section */}
      <div className="min-h-screen w-full  flex flex-col justify-start items-center relative ">
        {/* Nav-bar */}
        <div
          className={`mt-6 h-[40px]  w-[80%] border-[var(--helper-color2)] rounded-2xl flex justify-between items-center  ${amaticaSC.className} font-bold cursor-pointer`}
        >
          {/* logo - moving */}
          <div
            className="flex justify-center items-center logo"
            onMouseEnter={() => {
              logoTween.current.timeScale(0);
            }}
            onMouseLeave={() => {
              logoTween.current.timeScale(1);
            }}
          >
            <img src="/img/logo2.svg" className="size-12 "></img>
          </div>
          {/* navbar options */}
          <div>
            <ul className="flex items-center gap-[27px] [&>li:nth-child(-n+3):hover]:text-[var(--primary-color)]">
              <li>Home</li>
              <li>Watch</li>
              <li>About</li>
              <li
                className="flex justify-center items-center gap-[3px] group"
                ref={containerSelection}
              >
                <div
                  className="w-8 h-8 border-1  border-[var(--helper-color1)] rounded-full flex items-center justify-center bg-[var(--primary-color)] text-[var(--background-color)]"
                  ref={iconSelection}
                >
                  <ArrowRight className="size-4 "></ArrowRight>
                </div>
                <div
                  className=" border-1  border-[var(--helper-color1)] px-4 py-1 flex items-center justify-center rounded-r-full rounded-l-full text-center group-hover:text-[var(--primary-color)]"
                  ref={textSelection}
                >
                  <a
                    href="https://www.github.com/DestinyDriver/dekh"
                    target="_blank"
                  >
                    Star On Github
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        {/* Hero Poster */}
        <div className="min-h-full  w-full flex-1 flex justify-center items-center relative ">
          {/* background Hero Image */}
          <div className="  z-5  flex justify-center items-center absolute top-0">
            <img
              src="/img/hero.png"
              alt="🎃"
              className="size-[500px] object-contain mt-5 mr-5 blur-3xl "
            />
          </div>
          {/* Foreground Hero Image */}
          <div className="  z-6  flex justify-center items-center absolute top-0 ">
            <img
              src="/img/hero.png"
              alt="🎃"
              className="hero-img size-[500px] object-contain grayscale-100 filter [filter:url(#liquify)]"
            />
          </div>
          {/* main Text */}
          <div
            className={`font-light text-[250px] text-center text-[var(--primary-color)] ${amaticaSC.className} flex  z-10 mt-15`}
          >
            <span
              className="hover:rotate-x-35 origin-bottom transition-transform duration-300 px-[0.02em]"
              onClick={() => {
                setisPause(true);
              }}
            >
              D
            </span>
            <span className="hover:rotate-x-35 origin-bottom transition-transform duration-300 px-[0.02em]">
              E
            </span>
            <span className="hover:rotate-x-35 origin-bottom transition-transform duration-300 px-[0.02em]">
              K
            </span>
            <span className="hover:rotate-x-35 origin-bottom transition-transform duration-300 px-[0.02em]">
              H
            </span>
          </div>
        </div>
      </div>

      {/*Section-2*/}
      <div className="min-h-screen w-full border-1 bg-[var(--background-color)] flex justify-center items-center">
        <div className="h-[95vh] rounded-2xl w-[90%]  bg-[var(--helper-color2)]"></div>
      </div>
      {/* section-3 */}
      <div className="min-h-screen w-full border-1 bg-[var(--background-color)] relative flex justify-center items-center">
        {/* <div className="h-[70%] w-[90%] absolute -top-1 bg-[var(--helper-color2)]"></div> */}
      </div>
    </div>
  );
};

export default Hero;
