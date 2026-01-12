"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import localFont from "next/font/local";
import gsap from "gsap";
import { ArrowRight } from "iconoir-react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// gsap.registerPlugin(useGSAP);
const amaticaSC = localFont({
  src: "../public/fonts/AmaticaSC/AmaticaSC-Regular.ttf",
  display: "swap",
});

const Hero = ({ searchItem, setSearchItem, data }) => {
  const [isPause, setisPause] = useState(false);
  const [logoRotation, setlogoRotation] = useState(360);
  const containerSelection = useRef(null);
  const iconSelection = useRef(null);
  const textSelection = useRef(null);
  const logoTween = useRef(null);

  const router = useRouter();

  useGSAP(() => {
    gsap.set(".search-box", {
      opacity: 0,
      xPercent: -50,
      yPercent: -50,
      left: "50%",
      top: "50%",
      position: "fixed",
    });

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

    // timeline.addLabel("second", "+=0.4");

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
      "first"
    );

    timeline.to(
      "#clip-image",
      {
        height: "100vh",
        width: "100vw",
      },
      "first"
    );

    timeline.to(".search-box", {
      opacity: "100%",
    });

    const timeline2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".about-section",
        start: "bottom center",
        end: "top center",
        markers: true,
        pin: true,
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
      <div className="relative min-h-screen w-full ">
        {/* Search Box */}
        <div className="opacity-0  search-box   flex justify-center items-center flex-col absolute z-10 gap-10 ">
          <div
            className={`text-[var(--helper-color1)] ${amaticaSC.className} font-extrabold text-8xl text-shadow-md`}
          >
            Search. Watch. Repeat.
          </div>
          <input
            className="border-2 border-[var(--helper-color1)] h-[40px] w-[55vw] rounded-l-full rounded-r-full bg-[var(--helper-color1)]/20 text-[var(--background-color)] text-center px-4 py-2 outline-none
    focus:ring-1
    focus:ring-[var(--primary-color)]
    focus:border-[var(--primary-color)] "
            type="text"
            onChange={(e) => {
              setSearchItem(e.target.value);
            }}
          ></input>
          {data?.result?.results?.length > 0 && (
            <div>
              {data.result.results.slice(0, 5).map((el, ind) => {
                return (
                  <div
                    key={el.id}
                    className="h-[60px] w-[55vw] bg-[var(--background-color)] rounded-md flex justify-between items-center mt-1 hover:bg-amber-300"
                    onClick={() => {
                      const title =
                        el.media_type === "movie" ? el.title : el.name;
                      const slug = encodeURIComponent(
                        title
                          .toLowerCase()
                          .replace(/[^a-z0-9\s-]/g, "") // remove : , . ! etc
                          .trim()
                          .replace(/\s+/g, "-")
                      );

                      if (el.media_type === "tv") {
                        router.push(`/watch/tv/${slug}?ep=${el.id}`);
                      } else if (el.media_type === "movie") {
                        router.push(`/watch/movie/${slug}?ep=${el.id}`);
                      } else {
                        notFound();
                      }
                    }}
                  >
                    <div className="size-[50px] bg-green-400 ml-3 rounded-sm ">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${el.poster_path}`}
                        alt="poster"
                      />
                    </div>
                    <div className="flex flex-col justify-center items-center list-none ">
                      <div>
                        {el.media_type === "movie" ? el.title : el.name}
                      </div>
                      <div className="flex justify-end items-center gap-2 bg-green-500">
                        {el.adult === true && <li>18+</li>}
                        <li>
                          {el.media_type === "movie"
                            ? "movie"
                            : el.media_type === "tv"
                            ? "series"
                            : null}
                        </li>
                        <li>{Math.round(el.vote_average * 10) / 10}</li>
                        <li>
                          {el.media_type === "movie"
                            ? el.release_date.slice(0, 4)
                            : el.media_type === "tv"
                            ? el.first_air_date.slice(0, 4)
                            : null}
                        </li>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="min-h-screen w-full  bg-[var(--background-color)] flex justify-center items-center relative">
          {/* background img */}
          <div className="h-dvh w-screen  flex justify-center items-center clip">
            <div className="clip-img section2-img-mask  size-64 ">
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
      <div className="h-screen w-full  bg-[var(--background-color)] relative flex justify-center items-center">
        <div className=" h-[100vh] w-full  about-section">hii</div>
      </div>
      {/* section 4 */}
      <div className="h-screen w-full  bg-[var(--helper-color1)] relative flex justify-center items-center">
        <div className="h-screen w-full about-section"></div>
      </div>
    </div>
  );
};

export default Hero;
