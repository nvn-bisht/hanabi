import { Anime } from "@/types/animeData";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { SiMyanimelist, SiAnilist } from "react-icons/si";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { FaPlay } from "react-icons/fa";
import Link from "next/link";

const AnimeDetails = ({ animeData }: { animeData: Anime }) => {
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  const getAnimeIdFromUrl = () => {
    const pathParts = window.location.pathname.split("/");
    return pathParts[2];
  };

  const toggleDescription = () => {
    setDescriptionExpanded(!isDescriptionExpanded);
  };

  const removeHTMLTags = (description: string): string => {
    return description.replace(/<[^>]+>/g, "").replace(/\([^)]*\)/g, "");
  };

  const toggleTrailer = () => {
    setShowTrailer(!showTrailer);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && showTrailer) {
        setShowTrailer(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showTrailer]);

  function capitalizeFirstLetter(str: string) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const isScreenUnder500px = () => window.innerWidth < 500;

  console.log(animeData);

  return (
    <>
      {animeData && (
        <div className="max-w-screen-2xl mx-auto w-full h-max relative">
          {/* AnimeDataContainer */}
          <div className="rounded-lg my-7 flex flex-col md:flex-row items-start">
            {/* AnimeDataContainerTop */}
            <div className="flex flex-col p-0 md:mx-0 mx-auto items-start">
              <Image
                height={800}
                width={800}
                src={animeData.image}
                alt="Anime Title Image"
                className="rounded-lg w-full max-h-[500px] mb-2 md:max-h-[400px] "
              />
              {/* AnimeInfoImage */}
              {animeData.trailer && animeData.status !== "Not yet aired" && (
                <button
                  onClick={toggleTrailer}
                  className="mr-4 p-0 w-40 transition ease-in-out transform hover:scale-105 md:w-32"
                >
                  {/* ShowTrailerButton */}
                  <p>
                    <strong>TRAILER</strong>
                  </p>
                </button>
              )}
              {showTrailer && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-filter backdrop-blur-lg"
                  onClick={toggleTrailer}
                >
                  {/* TrailerOverlay */}
                  <div
                    className="w-3/5 aspect-w-16 aspect-h-9 rounded-lg overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* TrailerOverlayContent */}
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${animeData.trailer.id}`}
                      allowFullScreen
                    />
                    {/* IframeTrailer */}
                  </div>
                </div>
              )}
              <div className="flex gap-2 mr-4">
                {/* MalAniContainer */}
                {animeData.id && (
                  <a
                    href={`https://anilist.co/${
                      !animeData.type
                        ? "anime"
                        : animeData.type.toLowerCase() === "manga" ||
                          animeData.type.toLowerCase() === "novel"
                        ? "manga"
                        : "anime"
                    }/${animeData.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-20 h-10 flex justify-center items-center rounded-lg  hover:scale-105 transition ease-in-out"
                  >
                    <SiAnilist size="1.5rem" />
                  </a>
                )}
                {animeData.malId && (
                  <a
                    href={`https://myanimelist.net/${
                      !animeData.type
                        ? "anime"
                        : animeData.type.toLowerCase() === "manga" ||
                          animeData.type.toLowerCase() === "novel"
                        ? "manga"
                        : "anime"
                    }/${animeData.malId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-16 h-8 flex justify-center items-center rounded-lg  hover:scale-105 transition ease-in-out"
                  >
                    <SiMyanimelist size="2.75rem" />
                  </a>
                )}
              </div>
            </div>
            <div className="text-left text-sm mt-8 mx-3">
              {/* AnimeDataText */}
              <p className="leading-8 text-3xl  font-semibold mb-2">
                {animeData.title.english
                  ? animeData.title.english
                  : animeData.title.romaji}
              </p>
              <p
                className="italic mt-0 leading-3 mb-2"
                style={{ color: animeData.color }}
              >
                {animeData.title.romaji
                  ? animeData.title.romaji
                  : animeData.title.native}
              </p>
              {!isScreenUnder500px() && animeData.description && (
                <div className="text-gray-400">
                  {/* Description */}
                  <button
                    onClick={toggleDescription}
                    className="bg-var(--global-div) text-gray-400 flex border-none p-2 rounded-lg my-2 text-left"
                  >
                    {isDescriptionExpanded
                      ? removeHTMLTags(animeData.description)
                      : `${removeHTMLTags(animeData.description).substring(
                          0,
                          100
                        )}...`}
                    {isDescriptionExpanded ? "[Show Less]" : "[Show More]"}
                  </button>
                </div>
              )}

              <div className="flex my-4">
                <Button
                  asChild
                  className="bg-purple-600 rounded-full hover:bg-purple-700"
                >
                  <Link href={`/watch/${animeData.id}`}>
                    <FaPlay className="mr-2" /> Watch now
                  </Link>
                </Button>
              </div>

              <div className="grid  grid-cols-2 md:grid-cols-[1.2fr_1fr] xl:grid-cols-[1.25fr_1fr]">
                {/* ParentContainer */}
                <div className="rounded-lg pt-2 flex flex-row items-start">
                  {/* AnimeDataContainerMiddle */}
                  <div>
                    <p className="mb-1">
                      <strong className="mx-2"> Type: </strong>

                      <span className="text-xs">
                        {animeData.type ? animeData.type : "Unknown"}
                      </span>
                    </p>
                    <p className="mb-1">
                      <strong className="mx-2">Year: </strong>
                      <span className="text-xs">
                        {animeData.releaseDate
                          ? animeData.releaseDate
                          : "Unknown"}
                      </span>
                    </p>
                    <p className="mb-1">
                      <strong className="mx-2"> Status: </strong>
                      <span className="text-xs">
                        {animeData.status === "Completed"
                          ? "Finished"
                          : animeData.status === "Ongoing"
                          ? "Airing"
                          : animeData.status}
                      </span>
                    </p>
                    <p className="mb-1">
                      <strong className="mx-2"> Rating: </strong>
                      <span className="text-xs">
                        {animeData.rating ? animeData.rating : "Unknown"}
                      </span>
                    </p>
                    <p>
                      <strong className="mx-2"> Studios:</strong>
                      <span className="text-xs">
                        {animeData.studios && animeData.studios.length > 0
                          ? animeData.studios
                          : "Unknown"}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="mt-2 md:mt-0">
                  {/* AnimeDataContainerBottom */}
                  <div>
                    <p className="mb-1">
                      <strong className="mx-2"> Episodes: </strong>
                      <span className="text-xs">
                        {animeData.totalEpisodes !== null
                          ? animeData.totalEpisodes
                          : "Unknown"}
                      </span>
                    </p>
                    <p className="mb-1">
                      <strong className="mx-2"> Duration: </strong>
                      <span className="text-xs">
                        {animeData.duration
                          ? `${animeData.duration} min`
                          : "Unknown"}
                      </span>
                    </p>
                    <p className="mb-1">
                      <strong className="mx-2"> Season: </strong>
                      <span className="text-xs">
                        {animeData.season
                          ? capitalizeFirstLetter(animeData.season)
                          : "Unknown"}
                      </span>
                    </p>
                    <p className="mb-1">
                      <strong className="mx-2"> Country: </strong>
                      <span className="text-xs">
                        {animeData.countryOfOrigin}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-wrap gap-3 mt-4">
                  <span className="text-base">Genre :</span>{" "}
                  <div>
                    {animeData.genres.map((genre) => (
                      <Badge
                        variant="secondary"
                        key={genre}
                        className="hover:text-primary mr-2 font-light bg-neutral-700"
                      >
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AnimeDetails;
