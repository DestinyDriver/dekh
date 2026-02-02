"use client";
import React from "react";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "iconoir-react";
import { useRef } from "react";
import gsap from "gsap";
import localFont from "next/font/local";
import { useRouter } from "next/navigation";
const amaticaSC = localFont({
  src: "../public/fonts/AmaticaSC/AmaticaSC-Regular.ttf",
  display: "swap",
});

const Navbar = () => {
  const iconSelection = useRef(null);
  const containerSelection = useRef(null);
  const textSelection = useRef(null);
  const logoTween = useRef(null);

  const router = useRouter();

  useGSAP(() => {
    const container = containerSelection.current;

    const icon = iconSelection.current;
    const text = textSelection.current;

    const hoverTl = gsap.timeline({ paused: true });

    logoTween.current = gsap.to(".logo", {
      rotation: "+=360",

      repeat: -1,
      duration: 12,
      ease: "linear",
    });

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
        "<",
      );

    container.addEventListener("mouseenter", () => hoverTl.play());
    container.addEventListener("mouseleave", () => hoverTl.reverse());

    return () => {
      container.removeEventListener("mouseenter", () => hoverTl.play());
      container.removeEventListener("mouseleave", () => hoverTl.reverse());
    };
  }, []);

  return (
    <div
      className={`h-[80%]  w-[80%] border-[var(--helper-color2)] rounded-2xl flex justify-between items-center ${amaticaSC.className}  font-bold cursor-pointer`}
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
          <li
            onClick={() => {
              router.push("/");
            }}
          >
            Home
          </li>
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
  );
};

export default Navbar;
