"use client";

import { AnilistInfo } from "@/types/info";
import Image from "next/image";
import { FaClosedCaptioning } from "react-icons/fa";
import { IoIosMic } from "react-icons/io";
import { MdArrowForwardIos } from "react-icons/md";

const AnimeTable = ({
  popularAnime,
  mostScoredAnime,
  trendingAnime,
  topAiring,
}: {
  popularAnime: AnilistInfo[];
  mostScoredAnime: AnilistInfo[];
  trendingAnime: AnilistInfo[];
  topAiring: AnilistInfo[];
}) => {
  console.log(topAiring);
  return (
    <>
      {/* Top airing animes */}
      <div className="px-4">
        <h3 className="text-2xl font-semibold text-primary my-3">
          Popular Anime
        </h3>
        <div className="">
          {popularAnime.slice(0, 5).map((anime: AnilistInfo, index: number) => (
            <div
              className="flex gap-x-4 py-4 border-b-muted border-b"
              key={anime.id + index}
            >
              <div className="h-24 w-16 flex-shrink-0 relative">
                <Image
                  width={500}
                  height={500}
                  src={anime.image}
                  alt="anime poster"
                  className="rounded-xl h-full w-full object-cover"
                />
              </div>

              <div className="">
                <a
                  href={`/${anime.id}`}
                  className="font-medium lg:line-clamp-1 line-clamp-none text-sm hover:text-primary dark:text-primary-foreground text-secondary-foreground duration-200"
                >
                  {anime.title.english}
                </a>
                <div className="flex text-white w-fit gap-1 font-semibold text-xs border-muted border items-center mt-2">
                  <p className="bg-primary px-2 py-1 flex items-center line-clamp-1">
                    <FaClosedCaptioning className="mr-1 h-4 w-4" />{" "}
                    {anime.totalEpisodes || 0}
                  </p>
                  <p className="flex items-center text-black dark:text-white text-secondary-foreground dark:text-secondary">
                    <IoIosMic className="mr-1 h-4 w-4" />
                    {anime.countryOfOrigin || "JP"}
                  </p>
                  <span className="h-1 w-1 mx-2 rounded-full bg-muted-foreground flex" />
                  <p className="text-xs text-muted-foreground font-medium pr-2">
                    TV
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="py-4">
            <a
              href="/anime/top-airing"
              className="hover:text-primary text-sm w-fit flex items-center gap-x-2 duration-200"
            >
              Show more
              <MdArrowForwardIos />
            </a>
          </div>
        </div>
      </div>

      {/* Most Scored */}

      <div className="px-4">
        <h3 className="text-2xl font-semibold text-primary my-3">
          Most Scored
        </h3>
        <div className="">
          {mostScoredAnime.slice(0, 5).map((anime, index) => (
            <div
              className="flex gap-x-4 py-4 border-b-muted border-b"
              key={anime.id + index}
            >
              <div className="h-24 w-16 flex-shrink-0 relative">
                <Image
                  height={200}
                  width={200}
                  src={anime.image}
                  alt="anime poster"
                  className="rounded-xl h-full w-full object-cover"
                />
              </div>

              <div className="">
                <a
                  href={`/${anime.id}`}
                  className="font-medium lg:line-clamp-1 line-clamp-none hover:text-primary dark:text-primary-foreground text-secondary-foreground duration-200 text-sm"
                >
                  {anime.title.english}
                </a>
                <div className="flex w-fit gap-1 font-semibold text-xs border-muted border items-center mt-2">
                  <p className="bg-primary text-white px-2 py-1 flex items-center">
                    <FaClosedCaptioning className="mr-1 h-4 w-4" />{" "}
                    {anime.totalEpisodes || 0}
                  </p>
                  <p className="flex items-center dark:text-white text-black text-secondary-foreground dark:text-secondary">
                    <IoIosMic className="mr-1 h-4 w-4" />
                    {anime.countryOfOrigin || ""}
                  </p>
                  <span className="h-1 w-1 mx-2 rounded-full bg-muted-foreground flex" />
                  <p className="text-xs text-muted-foreground font-medium pr-2">
                    TV
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="py-4">
            <a
              href="/anime/top-airing"
              className="hover:text-primary text-sm w-fit flex items-center gap-x-2 duration-200"
            >
              Show more
              <MdArrowForwardIos />
            </a>
          </div>
        </div>
      </div>
      {/* Trending Anime*/}
      <div className="px-4">
        <h3 className="text-2xl font-semibold text-primary my-3">
          Trending Now
        </h3>
        <div className="h-fit">
          {trendingAnime
            .slice(5, 10)
            .map((anime: AnilistInfo, index: number) => (
              <div
                className="flex gap-x-4 py-4 border-b-muted border-b"
                key={anime.id + index}
              >
                <div className="h-24 w-16 flex-shrink-0 relative">
                  <Image
                    height={200}
                    width={200}
                    src={anime.image}
                    alt="anime imagge"
                    loading="lazy"
                    className="rounded-xl h-full w-full object-cover"
                  />
                </div>

                <div className="">
                  <a
                    href={`/${anime.id}`}
                    className="font-medium lg:line-clamp-1 line-clamp-none text-secondary-foreground dark:text-primary-foreground hover:text-primary duration-200 text-sm"
                  >
                    {anime.title.english || anime.title.romaji}
                  </a>
                  <div className="flex w-fit gap-1 font-semibold text-xs border-muted border items-center mt-2">
                    <p className="bg-primary px-2 py-1 text-white flex items-center">
                      <FaClosedCaptioning className="mr-1 h-4 w-4" />{" "}
                      {anime.totalEpisodes || 0}
                    </p>
                    <p className="flex items-center text-black dark:text-white text-secondary-foreground dark:text-secondary">
                      <IoIosMic className="mr-1 h-4 w-4" />
                      {anime.countryOfOrigin || ""}
                    </p>
                    <span className="h-1 w-1 mx-2 rounded-full bg-muted-foreground flex" />
                    <p className="text-xs text-muted-foreground font-medium pr-2">
                      TV
                    </p>
                  </div>
                </div>
              </div>
            ))}

          <div className="py-4">
            <a
              href="/anime/most-favorite"
              className="hover:text-primary text-sm w-fit flex items-center gap-x-2 duration-200"
            >
              Show more
              <MdArrowForwardIos />
            </a>
          </div>
        </div>
      </div>
      {/* Top Annual */}
      <div className="px-4">
        <h3 className="text-2xl font-semibold text-primary my-3">Top Annual</h3>
        <div className="">
          {topAiring.slice(5, 10).map((anime, index) => (
            <div
              className="flex gap-x-4 py-4 border-b-muted border-b"
              key={anime.id + index}
            >
              <div className="h-24 w-16 flex-shrink-0 relative">
                <Image
                  width={200}
                  height={200}
                  src={anime.image}
                  loading="lazy"
                  alt="anime image"
                  className="rounded-xl h-full w-full object-cover"
                />
              </div>

              <div className="">
                <a
                  href={`/${anime.id}`}
                  className="font-medium lg:line-clamp-1 line-clamp-none text-secondary-foreground dark:text-primary-foreground hover:text-primary duration-200 text-sm"
                >
                  {anime.title.english || anime.title.romaji}
                </a>
                <div className="flex w-fit gap-1 font-semibold text-xs border-muted border items-center mt-2">
                  <p className="bg-primary px-2 text-white py-1 flex items-center">
                    <FaClosedCaptioning className="mr-1 h-4 w-4" />{" "}
                    {anime.totalEpisodes || 0}
                  </p>
                  <p className="flex items-center text-black dark:text-white text-secondary-foreground dark:text-secondary">
                    <IoIosMic className="mr-1 h-4 w-4" />
                    {anime.countryOfOrigin || ""}
                  </p>
                  <span className="h-1 w-1 mx-2 rounded-full bg-muted-foreground flex" />
                  <p className="text-xs text-muted-foreground font-medium pr-2">
                    TV
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="py-4">
            <a
              href="/anime/completed"
              className="hover:text-primary text-sm w-fit flex items-center gap-x-2 duration-200"
            >
              Show more
              <MdArrowForwardIos />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default AnimeTable;
