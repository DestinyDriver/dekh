"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Contact from "./ContactUs";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Footer = () => {
  const footerContainer = useRef(null);

  useGSAP(() => {
    const container = footerContainer.current;
    if (!container) return;

    const w = container.getBoundingClientRect().width;

    // ✅ initial states
    gsap.set(".foot-circle", { height: 0, width: 0 });
    gsap.set(".foot-rectangle", { height: 0, width: 0 });
    gsap.set(".contact-us", { autoAlpha: 0 });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".foot-wrap",
        start: "top top",
        end: "+=1500",
        scrub: 1,
        pin: true,
        pinSpacing: true,
        markers: true,
      },
    });

    // ✅ FIRST
    timeline.fromTo(
      ".foot-circle",
      { height: 0, width: 0, rotateZ: 0 },
      {
        height: `${w * 0.35}px`,
        width: `${w * 0.35}px`,
        rotateZ: 360,
        ease: "none",
        duration: 1,
      },
      "First",
    );

    timeline.fromTo(
      ".foot-rectangle",
      { height: 0, width: 0, rotateZ: 0 },
      {
        height: `${w * 0.35}px`,
        width: `${w * 0.35}px`,
        rotateZ: 360,
        ease: "none",
        duration: 1,
      },
      "First",
    );

    // ✅ SECOND
    timeline.to(
      ".foot-container",
      { rotateZ: 90, duration: 1, ease: "none" },
      "Second",
    );

    timeline.to(
      ".foot-rectangle",
      { x: w * 1.2, duration: 1, ease: "none" },
      "Second",
    );

    // ✅ THIRD (circle expands)
    timeline.fromTo(
      ".foot-circle",
      { height: `${w * 0.35}px`, width: `${w * 0.35}px` },
      { height: `${w * 4}px`, width: `${w * 4}px`, duration: 1, ease: "none" },
      "THIRD",
    );

    // ✅ CONTACT appears AFTER THIRD ends
    timeline.to(".contact-us", {
      autoAlpha: 1,
      duration: 0.3,
      ease: "none",
    });
  }, []);

  return (
    <div className="w-full h-screen relative overflow-hidden foot-wrap bg-[var(--helper-color2)] ">
      {/* ✅ Shapes layer */}
      <div
        ref={footerContainer}
        className="absolute inset-0 z-0 flex justify-center items-center gap-4 foot-container pointer-events-none"
      >
        <div className="bg-[var(--background-color)] size-[10px] rounded-full foot-circle"></div>
        <div className="bg-[var(--background-color)] size-[10px] foot-rectangle rounded-3xl"></div>
      </div>

      {/* ✅ Contact layer (on top) */}
      <div className="contact-us absolute inset-0 z-[999] flex justify-center items-center">
        <Contact />
      </div>
    </div>
  );
};

export default Footer;
