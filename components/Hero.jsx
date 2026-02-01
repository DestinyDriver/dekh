"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import localFont from "next/font/local";
import gsap from "gsap";
import { ArrowRight, Search } from "iconoir-react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import Navbar from "./Navbar";

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
      "first",
    );

    timeline.to(
      "#clip-image",
      {
        height: "100vh",
        width: "100vw",
      },
      "first",
    );

    timeline.to(".search-box", {
      opacity: "100%",
    });

    const timeline2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".about-section",
        start: "bottom center",
        end: "top center",
        markers: false,
        pin: true,
      },
    });
  }, []);


  return (
    <div className="bg-[var(--background-color)] flex flex-col items-center  ">
      {/* Hero Section */}
      <div className="min-h-screen w-full  flex flex-col justify-start items-center relative ">
        {/* Nav-bar */}
        <Navbar />
        {/* Hero Poster */}
        <div className="min-h-full  w-full flex-1 flex justify-center items-center relative ">
          {/* background Hero Image */}
          <div className="  z-5  mt-16 md:mt-0 flex justify-center items-center absolute top-0">
            <img
              src="/img/hero.png"
              alt="🎃"
              className="size-[500px] object-contain mt-5 mr-5 blur-3xl "
            />
          </div>
          {/* Foreground Hero Image */}
          <div className="z-6 mt-16 md:mt-0  flex justify-center items-center absolute top-0 ">
            <img
              src="/img/hero.png"
              alt="🎃"
              className="hero-img size-[500px] object-contain grayscale-100 filter [filter:url(#liquify)]"
            />
          </div>
          {/* main Text */}
          <div
            className={`font-light text-[220px] md:text-[250px] text-center text-[var(--primary-color)] ${amaticaSC.className} flex  z-10 mt-15`}
          >
            <span
              className="hover:rotate-x-35  mt-12 md:mt-0 origin-bottom transition-transform duration-300 px-[0.02em]"
              onClick={() => {
                setisPause(true);
              }}
            >
              D
            </span>
            <span className="hover:rotate-x-35 mt-12 md:mt-0 origin-bottom transition-transform duration-300 px-[0.02em]">
              E
            </span>
            <span className="hover:rotate-x-35 mt-12 md:mt-0 origin-bottom transition-transform duration-300 px-[0.02em]">
              K
            </span>
            <span className="hover:rotate-x-35 mt-12 md:mt-0 origin-bottom transition-transform duration-300 px-[0.02em]">
              H
            </span>
          </div>
        </div>
      </div>

      {/*Section-2*/}
      <div className="relative min-h-screen w-full ">
        {/* Search Box */}
        <div className="opacity-0 search-box flex justify-center items-center flex-col fixed z-50 gap-6 w-[92vw] sm:w-[70vw] md:w-[55vw] max-w-[720px]">
          <div
            className={`text-[var(--helper-color1)] ${amaticaSC.className} font-extrabold text-5xl sm:text-7xl text-center drop-shadow-md`}
          >
            Search. Watch. Repeat.
          </div>

          {/* ✅ Search Bar */}
          <div className="w-full relative">
            <div className="flex items-center gap-2 bg-[var(--helper-color1)]/15 backdrop-blur-xl border border-white/10 rounded-full px-4 py-3 shadow-[0_0_40px_rgba(0,0,0,0.35)] focus-within:border-[var(--primary-color)] focus-within:shadow-[0_0_55px_rgba(0,173,181,0.4)] transition">
              <Search className="size-5 text-white/70" />

              <input
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
                className="w-full bg-transparent outline-none text-white font-semibold placeholder:text-white/40 text-sm sm:text-base"
                placeholder="Search movies, anime, webseries..."
              />

              {searchItem?.length > 0 && (
                <button
                  onClick={() => setSearchItem("")}
                  className="text-white/60 hover:text-white text-sm px-2"
                >
                  ✕
                </button>
              )}
            </div>

            {/* ✅ Search Suggestions Dropdown */}
            {data?.result?.results?.length > 0 &&
              searchItem.trim().length > 0 && (
                <div className="mt-3 w-full rounded-2xl overflow-hidden border border-white/10 bg-black/55 backdrop-blur-xl shadow-[0_0_45px_rgba(0,0,0,0.5)] suggestion-box">
                  {data.result.results.slice(0, 6).map((el) => {
                    const title =
                      el.media_type === "movie" ? el.title : el.name;
                    const year =
                      el.media_type === "movie"
                        ? el.release_date?.slice(0, 4)
                        : el.first_air_date?.slice(0, 4);

                    const rating = Math.round((el.vote_average || 0) * 10) / 10;

                    return (
                      <button
                        key={el.id}
                        className="w-full flex items-center gap-3 px-4 py-3 border-b border-white/10 hover:bg-white/5 transition text-left group suggestion-item"
                        onClick={() => {
                          const slug = encodeURIComponent(
                            (title || "")
                              .toLowerCase()
                              .replace(/[^a-z0-9\s-]/g, "")
                              .trim()
                              .replace(/\s+/g, "-"),
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
                        {/* Poster */}
                        <div className="h-[52px] w-[38px] rounded-lg overflow-hidden bg-white/5 border border-white/10 flex-shrink-0">
                          {el.poster_path ? (
                            <img
                              src={`https://image.tmdb.org/t/p/w185${el.poster_path}`}
                              alt={title}
                              className="h-full w-full object-cover group-hover:scale-[1.05] transition"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-white/40 text-[10px]">
                              N/A
                            </div>
                          )}
                        </div>

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                          <div className="text-white font-bold text-sm sm:text-base line-clamp-1">
                            {title}
                          </div>

                          <div className="flex items-center gap-2 text-xs text-white/60 mt-[2px]">
                            <span className="uppercase">
                              {el.media_type === "movie" ? "Movie" : "Series"}
                            </span>
                            <span>•</span>
                            <span>⭐ {rating}</span>
                            <span>•</span>
                            <span>{year || "----"}</span>
                          </div>
                        </div>

                        {/* Watch badge */}
                        <span className="text-[10px] px-2 py-1 rounded-full bg-[var(--primary-color)] text-black font-extrabold">
                          WATCH
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
          </div>
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
