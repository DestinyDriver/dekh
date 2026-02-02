"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import axios from "axios";
import {
  Prohibition,
  StarSolid,
  Calendar,
  Language,
  NavArrowDownSolid,
  DirectorChair,
  Search,
  User,
  FastArrowRight,
  Play,
} from "iconoir-react";
import styles from "@/components/Scrollbar.module.css";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const id = searchParams.get("ep");

  const recommendations = useMemo(
    () => data?.result?.recommendations?.results || [],
    [data],
  );

  async function fetchData() {
    if (!id || id.trim() === "") {
      router.replace("/not-found");
      return;
    }

    setLoading(true);
    try {
      const result = await axios.get(`/api/details/movie?id=${id}`);
      setData(result.data);
    } catch (err) {
      console.log(err);
      router.replace("/not-found");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  const details = useMemo(() => data?.result?.details, [data]);
  const credits = useMemo(() => data?.result?.credits, [data]);

  // ✅ Professional Loading State
  if (loading || !details) {
    return (
      <div className="min-h-screen bg-[var(--background-color)]">
        <div className="w-full h-[10vh] flex justify-center items-center">
          <Navbar />
        </div>

        <div className="w-full flex justify-center items-start py-6">
          <div className="w-[96%] rounded-2xl bg-[var(--helper-color2)] p-4 md:p-6">
            <div className="animate-pulse grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-4">
              <div className="rounded-xl bg-black/30 h-[280px] sm:h-[340px] lg:h-[520px]" />
              <div className="rounded-xl bg-black/30 h-[280px] sm:h-[340px] lg:h-[520px]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const rating = Math.round((details.vote_average ?? 0) * 10) / 10;
  const releaseYear = details.release_date?.slice(0, 4) || "----";

  return (
    <div className="min-h-screen bg-[var(--background-color)]">
      {/* Navbar */}
      <div className="w-full h-[10vh] flex justify-center items-center bg-[var(--background-color)]">
        <Navbar />
      </div>

      {/* Main */}
      <div className="w-full flex justify-center items-start pb-10 px-2 sm:px-4 mt-4">
        <div className="w-full max-w-[1400px] rounded-2xl overflow-hidden bg-[var(--helper-color2)] shadow-[0_0_60px_rgba(0,0,0,0.4)]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr]">
            {/* LEFT SIDE */}
            <div className="lg:border-r border-[var(--helper-color1)]">
              {/* Movie Card */}
              <div className="relative p-4 border-b border-[var(--helper-color1)]">
                <div className="absolute inset-0 opacity-20 pointer-events-none bg-gradient-to-br from-[var(--primary-color)] via-transparent to-purple-600" />

                <div className="relative grid grid-cols-[90px_1fr] sm:grid-cols-[110px_1fr] gap-4">
                  {/* Poster */}
                  <div className="w-[90px] sm:w-[110px] aspect-[2/3] rounded-xl overflow-hidden bg-black">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                      alt={details.title}
                      className="h-full w-full object-cover hover:scale-[1.05] transition-transform duration-300"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col justify-center gap-2">
                    <div className="text-[var(--background-color)]">
                      <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold leading-tight line-clamp-2">
                        {details.title}
                      </h1>

                      {details.tagline && (
                        <p className="text-xs sm:text-sm opacity-80 italic line-clamp-1">
                          ~ {details.tagline}
                        </p>
                      )}
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2">
                      {details.adult === true && (
                        <div className="flex items-center gap-1 rounded-full px-2 py-[3px] bg-black text-red-400 border border-white/10 text-[11px] sm:text-xs font-bold">
                          <Prohibition className="size-4" />
                          18+
                        </div>
                      )}

                      <div className="flex items-center gap-1 rounded-full px-2 py-[3px] bg-black text-yellow-400 border border-white/10 text-[11px] sm:text-xs font-bold">
                        <StarSolid className="size-4" />
                        {rating}
                      </div>

                      <div className="flex items-center gap-1 rounded-full px-2 py-[3px] bg-black text-white border border-white/10 text-[11px] sm:text-xs font-bold">
                        <Calendar className="size-4" />
                        {releaseYear}
                      </div>

                      <div className="flex items-center gap-1 rounded-full px-2 py-[3px] bg-black text-purple-300 border border-white/10 text-[11px] sm:text-xs font-bold uppercase">
                        <Language className="size-4" />
                        {details.original_language}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Episodes Section */}
              <div className="p-4">
                <div className="text-[var(--background-color)]">
                  <div className="flex items-center justify-between">
                    <h2 className="font-bold text-base sm:text-lg">Episodes</h2>
                  </div>

                  {/* Filter + Search */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                    <div className="flex items-center gap-2">
                      <DirectorChair className="size-4" />
                      <button className="w-full flex justify-between items-center px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-sm font-bold hover:bg-black/60 transition">
                        <span>EPS: 001 - 001</span>
                        <NavArrowDownSolid className="size-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-lg px-2 py-2">
                      <Search className="size-4 opacity-80" />
                      <input
                        type="text"
                        className="w-full bg-transparent outline-none text-sm font-semibold placeholder:text-white/50 text-[var(--background-color)]"
                        placeholder="Search Episode..."
                      />
                    </div>
                  </div>
                </div>

                {/* Episode List ✅ responsive height */}
                <div
                  className={`mt-4 max-h-[220px] sm:max-h-[280px] lg:max-h-[360px] overflow-y-auto rounded-xl border border-white/10 bg-black/40 ${styles.scrollBox}`}
                >
                  <button className="w-full text-left px-4 py-3 border-b border-white/10 hover:bg-white/5 transition">
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--background-color)] font-bold">
                        Episode 1
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-[var(--primary-color)] text-black font-bold">
                        Playing
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex flex-col">
              {/* ✅ Video responsive height */}
              <div className="bg-black relative w-full">
                <iframe
                  className="w-full h-[220px] sm:h-[300px] md:h-[420px] lg:h-[520px]"
                  allowFullScreen={true}
                  src={`https://www.2embed.cc/embed/${id}`}
                  frameBorder="0"
                />
              </div>

              {/* Details Panel */}
              <div className="p-4 md:p-5 text-[var(--background-color)]">
                {/* Overview */}
                <div className="border-b border-[var(--helper-color1)] pb-3">
                  <div className="text-sm font-bold opacity-80">Overview</div>
                  <p className="text-sm mt-1 leading-relaxed line-clamp-4 text-white/90">
                    {details.overview}
                  </p>
                </div>

                {/* Genres */}
                <div className="border-b border-[var(--helper-color1)] py-3">
                  <div className="text-sm font-bold opacity-80 mb-2">
                    Genres
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {details?.genres?.map((el) => (
                      <span
                        key={el.id}
                        className="px-3 py-1 rounded-full bg-black/50 border border-white/10 text-[11px] sm:text-xs font-bold hover:bg-black/70 transition"
                      >
                        {el.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Credits */}
                <div className="pt-3">
                  <div className="text-sm font-bold opacity-80 mb-3">
                    Top Cast
                  </div>

                  <div className="flex gap-4 overflow-x-auto pb-1 ">
                    {credits?.cast?.slice(0, 5)?.map((el, i) => (
                      <div
                        key={i}
                        className="min-w-[80px] sm:min-w-[86px] flex flex-col items-center gap-2"
                      >
                        <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-full overflow-hidden border border-white/10 bg-black/50">
                          {el.profile_path ? (
                            <img
                              src={`https://image.tmdb.org/t/p/w185${el.profile_path}`}
                              alt={el.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-[10px] text-white/60">
                              <User className="size-4"></User>
                            </div>
                          )}
                        </div>

                        <p className="text-[11px] sm:text-xs font-semibold text-center line-clamp-2 text-white/80">
                          {el.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* END RIGHT */}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="w-full flex justify-center items-start px-2 sm:px-4 pb-8">
        <div className="w-full max-w-[1400px] rounded-2xl bg-[var(--helper-color2)] shadow-[0_0_60px_rgba(0,0,0,0.35)] overflow-hidden no-scrollbar">
          {/* Header */}
          <div className="p-4 md:p-5 border-b border-[var(--helper-color1)]">
            <div className="flex items-center justify-between gap-4">
              <div className="text-[var(--background-color)]">
                <h2 className="text-base sm:text-lg font-extrabold">
                  Recommended Movies
                </h2>
                <p className="text-xs sm:text-sm text-white/60 mt-1">
                  Similar movies based on what you're watching
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-white/60">
                <span className="px-3 py-1 rounded-full bg-black/40 border border-white/10 flex justify-center items-center gap-1">
                  Scroll To See More <FastArrowRight className="size-4" />
                </span>
              </div>
            </div>
          </div>

          {/* List */}
          <div className="p-4 md:p-5">
            {recommendations.length === 0 ? (
              <div className="text-white/60 text-sm">
                No recommendations available right now.
              </div>
            ) : (
              <div
                className={`flex gap-4 overflow-x-auto pb-2 ${styles.noScrollbar}`}
              >
                {recommendations.slice(0, 18).map((movie) => {
                  const posterUrl = movie.poster_path
                    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                    : "";

                  return (
                    <button
                      key={movie.id}
                      onClick={() => {
                        const slug = encodeURIComponent(
                          (movie.title || "")
                            .toLowerCase()
                            .replace(/[^a-z0-9\s-]/g, "")
                            .trim()
                            .replace(/\s+/g, "-"),
                        );

                        router.push(`/watch/movie/${slug}?ep=${movie.id}`);
                      }}
                      className="group min-w-[140px] sm:min-w-[160px] md:min-w-[180px] text-left rounded-2xl overflow-hidden border border-white/10 bg-black/40 transition focus:outline-none focus:ring-2 "
                    >
                      {/* Poster */}

                      <div className="relative ">
                        {/* overlay */}
                        <div className="absolute inset-0  opacity-0 group-hover:opacity-100 transition duration-300 bg-black/45 z-10" />

                        {/* Play Icon Center */}
                        <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition duration-300">
                          <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full  text-white flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.6)] scale-90 group-hover:scale-100 transition-transform duration-300">
                            <Play className="size-6 sm:size-7" />
                          </div>
                        </div>

                        {/* Image */}
                        <div className="h-[210px] sm:h-[240px] md:h-[260px] bg-black overflow-hidden ">
                          {posterUrl ? (
                            <img
                              src={posterUrl}
                              alt={movie.title}
                              loading="lazy"
                              className="h-full w-full object-cover  object-top transition duration-300 group-hover:scale-[1.06] group-hover:grayscale-100"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-xs text-white/50">
                              No Poster
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Text */}
                      <div className="p-3">
                        <p className="text-[12px] sm:text-[13px] font-extrabold text-[var(--background-color)] line-clamp-2 leading-snug text-center">
                          {movie.title}
                        </p>

                        <div className="mt-2 flex items-center justify-between gap-2 flex justify-center">
                          <p className="text-[11px] text-white/60 font-semibold text-center">
                            {movie.release_date?.slice(0, 4) || "----"}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Extra Section */}
      <div className="bg-[var(--helper-color2)] w-full h-[20vh] sm:h-[30vh] md:h-[40vh] rounded-t-3xl" />
    </div>
  );
};

export default Page;
