import { AnilistInfo } from "@/types/info";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useMemo } from "react";

import { FaPlay, FaStar, FaCalendarAlt } from "react-icons/fa";
import { TbCards } from "react-icons/tb";

export const AnimeCard = ({ anime }: { anime: AnilistInfo }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const imageSrc = anime.image || "";
  const animeColor = anime.color || "#999999";
  const displayTitle = anime.title.english || anime.title.romaji || "No Title";

  const truncateTitle = (title: string, maxLength: number) =>
    title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;

  //   const handleImageLoad = () => {
  //     setLoading(false); // Set loading to false when image is loaded
  //   };

  const displayDetail = useMemo(() => {
    return (
      <p
        className={`absolute bottom-0 m-1 p-1 text-xs font-bold opacity-90 bg-[var(--global-button-shadow)] rounded-[0.3rem] backdrop-filter backdrop-blur-md transition-all duration-200 ${
          isHovered ? "" : "hidden"
        }`}
        style={{ color: anime.color }}
      >
        {anime.type}
      </p>
    );
  }, [isHovered, anime.color, anime.type]);

  return (
    <>
      <Link
        href={`/${anime.id}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="block mx-1.5 w-full text-[#333] animate-slideUp no-underline hover:z-10"
        style={{ color: animeColor }}
        title={anime.title.english || anime.title.romaji}
      >
        <div className="w-full rounded-[0.3rem] cursor-pointer transform transition-transform duration-200 ease-in-out">
          <div className="transition-transform  duration-200 ease-in-out">
            <div className="relative md:w-[227px] md:h-[314px] w-[177.5px] h-[245.6px] overflow-hidden rounded-[0.3rem] pt-[calc(100% * 184 / 133)] bg-[#fff] shadow-md transition-colors duration-200 ease-in-out animate-slideUp mx-auto">
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <Image
                  src={imageSrc}
                  width={200}
                  height={200}
                  loading="eager"
                  alt={
                    anime.title.english || anime.title.romaji + " Cover Image"
                  }
                  className="absolute top-0 left-0 w-full h-full rounded-[0.3rem] transition-all duration-300 ease-in-out hover:brightness-50"
                />
                <FaPlay
                  className="absolute top-1/2 left-1/2 text-white transform -translate-x-1/2 -translate-y-1/2 text-2xl opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100"
                  title={"Play " + (anime.title.english || anime.title.romaji)}
                />
              </div>
              {displayDetail}
            </div>
          </div>
          <div
            className={`flex items-center p-2 mt-1 rounded-[0.3rem] cursor-pointer transition-colors duration-200 ease-in-out ${
              isHovered ? "bg-[var(--global-card-title-bg)]" : ""
            }`}
          >
            {/* <StatusIndicator status={anime.status} /> */}
            <h5
              className="m-0 overflow-hidden whitespace-nowrap text-ellipsis transition-colors duration-200 ease-in-out"
              style={{
                color: isHovered ? anime.color : "var(--title-color)",
              }}
              title={"Title: " + (anime.title.english || anime.title.romaji)}
            >
              {truncateTitle(displayTitle, 20)}
            </h5>
          </div>
          <div>
            <div className="flex items-center w-full font-bold text-sm text-[rgba(102,102,102,0.65)] mt-1 p-1 gap-2 overflow-hidden text-ellipsis">
              {truncateTitle(anime.title.romaji || "", 24)}
            </div>
            <div className="flex items-center w-full font-bold text-sm text-[rgba(102,102,102,0.65)] p-1 gap-2 overflow-hidden text-ellipsis">
              {anime.releaseDate && (
                <>
                  <FaCalendarAlt className="mr-2" />
                  {anime.releaseDate}
                </>
              )}
              {(anime.totalEpisodes || anime.episodes) && (
                <>
                  <TbCards className="mr-2" />
                  {anime.totalEpisodes || anime.episodes}
                </>
              )}
              {anime.rating && (
                <>
                  <FaStar className="mr-2" />
                  {anime.rating}
                </>
              )}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
