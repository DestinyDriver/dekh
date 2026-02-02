"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import localFont from "next/font/local";
import gsap from "gsap";
import { ArrowRight, Search } from "iconoir-react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import WarningMarquee from "./WarningMarquee";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// gsap.registerPlugin(useGSAP);
const amaticaSC = localFont({
  src: "../public/fonts/AmaticaSC/AmaticaSC-Regular.ttf",
  display: "swap",
});

const Hero = ({ searchItem, setSearchItem, data }) => {
  const [isPause, setisPause] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [logoRotation, setlogoRotation] = useState(360);
  const containerSelection = useRef(null);
  const iconSelection = useRef(null);
  const textSelection = useRef(null);
  const logoTween = useRef(null);

  const clipWrapRef = useRef(null);
  const clipInnerRef = useRef(null);

  const mouseEnabled = useRef(true);

  useGSAP(() => {
    const wrap = clipWrapRef.current;
    const inner = clipInnerRef.current;
    if (!wrap || !inner) return;

    const move = (e) => {
      if (!mouseEnabled.current) return;

      const rect = wrap.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const px = (x - 0.5) * 2;
      const py = (y - 0.5) * 2;

      gsap.to(inner, {
        rotateY: px * 12,
        rotateX: -py * 12,
        x: px * 18,
        y: py * 18,
        duration: 0.35,
        ease: "power3.out",
        transformPerspective: 800,
        transformOrigin: "center",
      });
    };

    const reset = () => {
      gsap.to(inner, {
        rotateX: 0,
        rotateY: 0,
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    wrap.addEventListener("mousemove", move);
    wrap.addEventListener("mouseleave", reset);

    return () => {
      wrap.removeEventListener("mousemove", move);
      wrap.removeEventListener("mouseleave", reset);
    };
  }, []);

  const router = useRouter();

  useGSAP(() => {
    gsap.set(".search-box", { opacity: 0 });

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

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".clip",
        start: "center center",
        end: "+=600",
        scrub: 1,
        pin: true,
        pinSpacing: true,
      },
    });

    timeline.to({}, { duration: 1 });

    timeline.to(
      {},
      {
        duration: 0.01,
        onStart: () => {
          mouseEnabled.current = false;

          gsap.to(clipInnerRef.current, {
            rotateX: 0,
            rotateY: 0,
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
          });
        },
        onReverseComplete: () => {
          mouseEnabled.current = true;
        },
      },
    );

    timeline.fromTo(
      ".section2-img-mask",
      {
        clipPath: "polygon(20% 0%, 71% 22%, 89% 100%, 18% 73%)",
      },
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        width: "100vw",
        height: "100vh",
        ease: "none",
      },
    );

    timeline.to(
      "#clip-image",
      {
        height: "100vh",
        width: "100vw",
        ease: "none",
      },
      "<",
    );

    timeline.to(
      ".search-box",
      {
        opacity: 1,
      },
      "second",
    );

    // timeline.to({}, { duration: 2 });

    // timeline.to(".search-box", {
    //   position: "fixed",
    //   top: "50%",
    //   left: "50%",
    //   xPercent: -50,
    //   yPercent: -50,
    //   duration: 0,
    // });

    gsap.set(".footer", { yPercent: 110, zIndex: 50 });

    gsap.to(".footer", {
      yPercent: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".footer2",
        start: "bottom bottom",
        end: "+=600",
        scrub: 1,
        pin: true,
        pinSpacing: false,
        // markers: true,
      },
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
              <li>
                <Link className="relative inline-block group" href="/">
                  <span className="">Home</span>
                  <span className="absolute left-0 -bottom-[0.5px] h-[1px] w-0 bg-[var(--primary-color)] transition-all duration-200 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link className="relative inline-block group" href="/">
                  <span className="">Watch</span>
                  <span className="absolute left-0 -bottom-[0.5px] h-[1px] w-0 bg-[var(--primary-color)] transition-all duration-200 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link className="relative inline-block group" href="/">
                  <span className="">About</span>
                  <span className="absolute left-0 -bottom-[0.5px] h-[1px] w-0 bg-[var(--primary-color)] transition-all duration-200 group-hover:w-full"></span>
                </Link>
              </li>
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
        <div className="min-h-full  w-full flex-1 flex justify-center items-center relative">
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
            className={`font-light text-[250px] text-center text-[var(--primary-color)] ${amaticaSC.className} flex  z-10 mt-15 `}
          >
            <span
              className="hover:rotate-x-35 origin-bottom transition-transform duration-300 px-[0.02em] cursor-default"
              onClick={() => {
                setisPause(true);
              }}
            >
              D
            </span>
            <span className="hover:rotate-x-35 origin-bottom transition-transform duration-300 px-[0.02em] cursor-default">
              E
            </span>
            <span className="hover:rotate-x-35 origin-bottom transition-transform duration-300 px-[0.02em] cursor-default">
              K
            </span>
            <span className="hover:rotate-x-35 origin-bottom transition-transform duration-300 px-[0.02em] cursor-default">
              H
            </span>
          </div>
        </div>
      </div>

      {/*Section-2*/}
      <div className="relative min-h-screen w-full ">
        <WarningMarquee></WarningMarquee>
        <div className="opacity-0 search-box absolute z-50 w-[92vw] sm:w-[70vw] md:w-[55vw] max-w-[720px] left-1/2 bottom-1/4 -translate-x-1/2">
          <div
            className="
      relative overflow-hidden rounded-[28px]
      border border-white/20
      bg-black/55 backdrop-blur-2xl
      shadow-[0_0_90px_rgba(0,0,0,0.75)]
      px-6 sm:px-8 py-6 sm:py-7
    "
          >
            {/* ✅ Contrast overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/40" />

            {/* ✅ Soft glow blobs */}
            <div className="absolute -top-10 -left-10 h-44 w-44 rounded-full bg-[var(--primary-color)]/25 blur-3xl" />
            <div className="absolute -bottom-12 -right-12 h-44 w-44 rounded-full bg-purple-500/15 blur-3xl" />

            {/* ✅ Top glow line */}
            <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[var(--primary-color)]/80 to-transparent" />

            {/* ✅ Content */}
            <div className="relative flex flex-col gap-5">
              {/* Top Row */}
              <div className="flex items-start justify-between gap-5">
                <div className="flex flex-col">
                  <div
                    className={`
              text-white ${amaticaSC.className}
              font-extrabold text-5xl sm:text-7xl
              leading-[0.9]
              drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]
            `}
                  >
                    Search. Watch. Repeat.
                  </div>

                  <p className="mt-3 text-white/80 text-sm sm:text-base max-w-[52ch] drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                    Discover movies, anime & webseries in seconds - clean UI,
                    fast results, zero distractions.
                  </p>
                </div>

                {/* Search Icon Button */}
                <button
                  className="
            group relative shrink-0 h-[56px] w-[56px]
            rounded-2xl bg-[var(--primary-color)] text-black
            flex items-center justify-center
            shadow-[0_0_30px_rgba(0,173,181,0.65)]
            hover:scale-[1.06] active:scale-[0.98] transition
          "
                >
                  <Search className="size-6 transition group-hover:rotate-12" />
                  <span className="absolute inset-0 rounded-2xl ring-1 ring-black/20 group-hover:ring-white/15 transition" />
                </button>
              </div>

              {/* Feature Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/85 text-xs sm:text-sm hover:scale-105">
                  Instant results
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/85 text-xs sm:text-sm hover:scale-105">
                  🎬 Movies + Series
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/85 text-xs sm:text-sm hover:scale-105">
                  ⭐ Ratings + Year
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/85 text-xs sm:text-sm hover:scale-105">
                  🔥 Trending picks
                </span>
              </div>

              {/* Footer Hint */}
              <div className="flex items-center justify-between text-xs sm:text-xs text-white/50">
                <span>Tip: Click the icon to start searching</span>
              </div>
            </div>
          </div>
        </div>

        <div className="min-h-screen w-full  bg-[var(--background-color)] flex justify-center items-center relative">
          {/* background img */}
          <div
            ref={clipWrapRef}
            className="h-dvh w-screen   flex justify-center items-center clip drop-shadow-xl drop-shadow-black "
          >
            <div
              ref={clipInnerRef}
              className="clip-img section2-img-mask  size-64 "
            >
              <img
                src="/img/back.png"
                alt=""
                className={`  object-cover size-[200%]`}
                id="clip-image"
              />
            </div>
          </div>
        </div>
      </div>
      {/* section-3 */}
      <div className="h-screen w-full  bg-[var(--background-color)] relative flex justify-center items-center footer2 ">
        <div className=" h-[100vh] w-full  about-section">hii</div>
      </div>
      {/* section 4 */}
      <div className="h-screen w-full  bg-[var(--helper-color1)] relative flex justify-center items-center footer">
        <div className="h-screen w-full about-section"></div>
      </div>
    </div>
  );
};

export default Hero;
