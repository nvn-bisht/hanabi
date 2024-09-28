"use client";

import { buttonVariants } from "@/components/ui/button";
import { useGetHomePageData } from "@/lib/react-query/queriesAndMutations";
import { cn } from "@/lib/utils";
import { useState } from "react";
import ReactSimplyCarousel from "react-simply-carousel";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { HomeCarousel } from "@/components/home/home-carousel";
import { AnimeCard } from "@/components/card/anime-card";
import { AnilistInfo } from "@/types/info";
import AnimeTable from "@/components/home/anime-table";

const Page = () => {
  const { data: HomePageData, isLoading: isFetchingHomePageData } =
    useGetHomePageData({ page: 1, perPage: 35 });

  console.log(HomePageData?.trendingAnime);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  if (isFetchingHomePageData) return <div>LoadingHomeData...</div>;

  if (!HomePageData) return <div>Error</div>;

  console.log(HomePageData);

  return (
    <div className="max-w-screen-2xl mx-auto w-full">
      <div className="relative">
        <HomeCarousel data={HomePageData.mostScored.results} />
      </div>

      <div className="w-full px-4 my-10">
        <h2 className="text-2xl text-primary font-semibold mb-6">Trending</h2>

        <div className="relative w-full lg:pr-16">
          <ReactSimplyCarousel
            activeSlideIndex={activeSlideIndex}
            onRequestChange={setActiveSlideIndex}
            itemsToShow={7}
            itemsToScroll={1}
            swipeTreshold={100}
            disableSwipeByMouse={false}
            forwardBtnProps={{
              className:
                "hidden lg:block z-10 absolute right-0 bottom-0 h-[49%]",
              children: (
                <span
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                      className: "h-full w-full",
                    })
                  )}
                >
                  <GrFormNext className="h-5 w-5" />
                </span>
              ),
            }}
            backwardBtnProps={{
              className: "hidden lg:block z-10 absolute right-0 top-0 h-[49%]",
              children: (
                <span
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                      className: "h-full w-full",
                    })
                  )}
                >
                  <GrFormPrevious className="h-5 w-5" />
                </span>
              ),
            }}
            responsiveProps={[
              {
                itemsToShow: 6,
                itemsToScroll: 3,
                minWidth: 768,
                maxWidth: 1536,
              },
              {
                itemsToShow: 1,
                itemsToScroll: 1,
                minWidth: 130,
                maxWidth: 320,
              },
              {
                itemsToShow: 3,
                itemsToScroll: 1,
                minWidth: 320,
                maxWidth: 512,
              },
              {
                itemsToShow: 4,
                itemsToScroll: 2,
                minWidth: 512,
                maxWidth: 768,
              },
            ]}
            speed={400}
            infinite={false}
            easing="ease-in-out"
          >
            {HomePageData.trendingAnime.results.map(
              (anime: AnilistInfo, i: number) => (
                <div className=" w-full" key={i}>
                  <AnimeCard anime={anime} />
                </div>
              )
            )}
          </ReactSimplyCarousel>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 h-auto">
        <AnimeTable
          mostScoredAnime={HomePageData.mostScored.results}
          popularAnime={HomePageData.popularAnime.results}
          trendingAnime={HomePageData.trendingAnime.results}
          topAiring={HomePageData.topAiring.results}
        />
      </div>
    </div>
  );
};

export default Page;
