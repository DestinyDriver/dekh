"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "iconoir-react";

export default function WarningMarquee() {
  const trackRef = useRef(null);
  const dir = useRef(-1);
  const lastScrollY = useRef(0);
  const x = useRef(0);
  const widthRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const arrows = gsap.utils.toArray(".marquee-arrow");

    const updateWidth = () => {
      const first = track.children[0];
      if (!first) return;
      widthRef.current = first.getBoundingClientRect().width;
    };

    updateWidth();
    setTimeout(updateWidth, 200);

    window.addEventListener("resize", updateWidth);

    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const current = window.scrollY;

      dir.current = current > lastScrollY.current ? -1 : 1;
      lastScrollY.current = current;

      gsap.to(arrows, {
        rotation: dir.current === -1 ? 0 : 180,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    window.addEventListener("scroll", handleScroll);

    const tick = () => {
      const w = widthRef.current;
      if (!w) return;

      x.current += 1 * dir.current;

      if (dir.current === -1 && x.current <= -w) x.current += w; // moving left
      if (dir.current === 1 && x.current >= 0) x.current -= w; // moving right

      gsap.set(track, { x: x.current });
    };

    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateWidth);
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <div className="absolute top-0 h-8 w-full overflow-hidden bg-[var(--helper-color2)] text-[var(--background-color)] flex items-center text-sm font-bold z-[100]">
      <div
        ref={trackRef}
        className="flex items-center whitespace-nowrap will-change-transform"
      >
        {/* Copy 1 */}
        <span className="flex items-center gap-3 px-2">
          <span>Dekh</span>
          <span>
            does not host, upload, or store any media content; all information
            is sourced from third-party providers and rights remain with their
            respective owners.
          </span>
          <span className="marquee-arrow inline-flex items-center mx-2 px-1 py-1 bg-[var(--primary-color)] rounded-full">
            <ArrowRight className="size-4 text-bold"></ArrowRight>
          </span>

          <span>Dekh</span>
          <span>
            does not host, upload, or store any media content; all information
            is sourced from third-party providers and rights remain with their
            respective owners.
          </span>
          <span className="marquee-arrow inline-flex items-center mx-2 px-1 py-1 bg-[var(--primary-color)] rounded-full">
            <ArrowRight className="size-4 text-bold"></ArrowRight>
          </span>
        </span>

        {/* Copy 2 */}
        <span className="flex items-center gap-3 px-2">
          <span>Dekh</span>
          <span>
            does not host, upload, or store any media content; all information
            is sourced from third-party providers and rights remain with their
            respective owners.
          </span>
          <span className="marquee-arrow inline-flex items-center mx-2 px-1 py-1 bg-[var(--primary-color)] rounded-full">
            <ArrowRight className="size-4 text-bold"></ArrowRight>
          </span>

          <span>Dekh</span>
          <span>
            does not host, upload, or store any media content; all information
            is sourced from third-party providers and rights remain with their
            respective owners.
          </span>
          <span className="marquee-arrow inline-flex items-center mx-2 px-1 py-1 bg-[var(--primary-color)] rounded-full">
            <ArrowRight className="size-4 text-bold"></ArrowRight>
          </span>
        </span>
      </div>
    </div>
  );
}
