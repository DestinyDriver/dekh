"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Footer = () => {
  const footerContainer = useRef(null);
  useGSAP(() => {
    const continer = footerContainer.current;
    if (!continer) return;

    const h = continer.getBoundingClientRect().height;
    const w = continer.getBoundingClientRect().width;

    gsap.set(".foot-circle", { height: 0, width: 0 });
    gsap.set(".foot-rectangle", { height: 0, width: 0 });

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

    timeline.fromTo(
      ".foot-circle",
      { height: "0px", width: "0px", rotateZ: 0 },
      { height: `${w * 0.35}px`, width: `${w * 0.35}px`, rotateZ: 360 },
      "First",
    );

    timeline.fromTo(
      ".foot-rectangle",
      { height: "0px", width: "0px", rotateZ: 0 },
      { height: `${w * 0.35}px`, width: `${w * 0.35}px`, rotateZ: 360 },
      "First",
    );

    timeline.to(
      ".foot-container",
      {
        rotateZ: 90,
        duration: 1,
        ease: "none",
      },
      "Second",
    );

    timeline.to(
      ".foot-circle",
      {
        x: 0,
        y: 0,
        duration: 1,
        ease: "none",
      },
      "Second",
    );

    timeline.to(
      ".foot-rectangle",
      {
        x: w, // move right out
        // y: w * 0.6, // move up out (optional)
        duration: 1,
        ease: "none",
      },
      "Second",
    );

    // timeline.to({}, { duration: 0.25 });

    timeline.fromTo(
      ".foot-circle",
      { height: `${w * 0.4}px`, width: `${w * 0.4}px` },
      { height: `${w * 4}px`, width: `${w * 4}px`, duration: 1 },

      "THIRD",
    );
  }, []);

  return (
    <div className="w-full h-screen relative overflow-hidden foot-wrap bg-[var(--background-color)]">
      {/* overlay */}
      <div className="test w-full h-screen -z-10"></div>

      <div
        ref={footerContainer}
        className="absolute  inset-0 z-0 flex justify-center items-center gap-4 foot-container"
      >
        <div className=" bg-black size-[10px] rounded-full foot-circle"></div>
        <div className=" bg-black size-[10px] foot-rectangle rounded-3xl"></div>
      </div>

      <div className="w-full h-full relative z-10 flex justify-center items-center">
        Dekh
      </div>
    </div>
  );
};

export default Footer;
