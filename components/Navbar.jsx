"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import localFont from "next/font/local";
import { ArrowRight } from "iconoir-react";
import { useRouter } from "next/navigation";

const amaticaSC = localFont({
  src: "../public/fonts/AmaticaSC/AmaticaSC-Regular.ttf",
  display: "swap",
});

const Navbar = () => {
  const router = useRouter();

  const iconRef = useRef(null);
  const textRef = useRef(null);
  const logoRef = useRef(null);
  const hoverTl = useRef(null);
  const logoTl = useRef(null);

  useGSAP(() => {
    // Logo rotation
    logoTl.current = gsap.to(logoRef.current, {
      rotation: "+=360",
      repeat: -1,
      duration: 12,
      ease: "linear",
    });

    // Hover timeline (desktop only)
    hoverTl.current = gsap.timeline({ paused: true });

    hoverTl.current
      .to(iconRef.current, {
        x: 116,
        rotateZ: 180,
        duration: 0.4,
        ease: "power3.out",
      })
      .to(
        textRef.current,
        {
          x: -37,
          duration: 0.4,
          ease: "power3.out",
        },
        "<"
      );
  }, []);

  return (
    <nav
      className={`mt-4 w-[94%] sm:w-[90%] md:w-[80%] flex justify-between items-center ${amaticaSC.className} font-bold`}
    >
      {/* Logo */}
      <div
        ref={logoRef}
        className="flex items-center cursor-pointer shrink-0"
        onMouseEnter={() => logoTl.current?.timeScale(0)}
        onMouseLeave={() => logoTl.current?.timeScale(1)}
        onClick={() => router.push("/")}
      >
        <img
          src="/img/logo2.svg"
          alt="logo"
          className="size-9 sm:size-10 md:size-12"
        />
      </div>

      {/* Nav items */}
      <ul className="flex items-center gap-3 sm:gap-5 md:gap-[27px] text-sm sm:text-base md:text-lg whitespace-nowrap [&>li:nth-child(-n+3):hover]:text-[var(--primary-color)]">
        <li onClick={() => router.push("/")}>Home</li>
        <li>Watch</li>
        <li>About</li>

        {/* CTA */}
        <li
          className="flex items-center gap-[3px] cursor-pointer"
          onMouseEnter={() => {
            if (window.innerWidth >= 768) hoverTl.current?.play();
          }}
          onMouseLeave={() => {
            if (window.innerWidth >= 768) hoverTl.current?.reverse();
          }}
        >
          <div
            ref={iconRef}
            className="hidden md:flex w-7 h-7 sm:w-8 sm:h-8 border border-[var(--helper-color1)] rounded-full items-center justify-center bg-[var(--primary-color)] text-[var(--background-color)]"
          >

            <ArrowRight className="size-3 sm:size-4" />
          </div>

          <div
            ref={textRef}
            className="border border-[var(--helper-color1)] px-3 sm:px-4 py-[2px] sm:py-1 rounded-full text-xs sm:text-sm md:text-base"
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
    </nav>
  );
};

export default Navbar;
