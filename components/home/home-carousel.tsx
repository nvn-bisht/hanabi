import "swiper/css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AnilistInfo } from "@/types/info";
import ReactSimplyCarousel from "react-simply-carousel";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Badge } from "../ui/badge";
import { BsPlayCircleFill } from "react-icons/bs";

interface HomeCarouselProps {
  data: AnilistInfo[];
  loading?: boolean;
  error?: string | null;
}

export const HomeCarousel = ({
  data = [],
  loading,
  error,
}: HomeCarouselProps) => {
  const router = useRouter();
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const handlePlayButtonClick = (id: string) => {
    router.push(`/details/${id}`);
  };

  const truncateTitle = (title: string, maxLength: number = 40): string => {
    return title.length > maxLength
      ? `${title.substring(0, maxLength)}...`
      : title;
  };

  const validData = data.filter(
    (item) =>
      item.title &&
      item.title.english &&
      item.description &&
      item.cover !== item.image
  );

  return (
    <ReactSimplyCarousel
      activeSlideIndex={activeSlideIndex}
      onRequestChange={setActiveSlideIndex}
      itemsToShow={1}
      autoplay
      autoplayDelay={6000}
      autoplayDirection="forward"
      itemsToScroll={1}
      swipeTreshold={100}
      forwardBtnProps={{
        //here you can also pass className, or any other button element attributes
        className: "absolute z-10 right-4 bottom-16",
        children: (
          <span
            className={cn(
              buttonVariants({ variant: "secondary", size: "icon" })
            )}
          >
            <IoIosArrowBack />
          </span>
        ),
      }}
      backwardBtnProps={{
        //here you can also pass className, or any other button element attributes
        className: "absolute z-10 right-4 bottom-4",
        children: (
          <span
            className={cn(
              buttonVariants({ variant: "secondary", size: "icon" })
            )}
          >
            <IoIosArrowForward />
          </span>
        ),
      }}
      responsiveProps={[
        {
          itemsToShow: 1,
          itemsToScroll: 1,
          minWidth: 768,
        },
      ]}
      speed={400}
      infinite
      easing="ease-in-out"
    >
      {/* here you can also pass any other element attributes. Also, you can use your custom components as slides */}
      {validData?.map(
        ({
          id,
          cover,
          title,
          description,
          rating,
          totalEpisodes,
          duration,
          type,
          color,
          status,
          releaseDate,
        }) => {
          return (
            <div
              className="min-h-80 max-h-[580px] h-[50vw] w-screen relative before:absolute before:bottom-0 before:left-0 before:h-1/2 before:w-full before:bg-gradient-to-t before:from-white/70 before:to-transparent dark:before:from-black dark:before:to-transparent before:z-20"
              key={id}
            >
              <div className="absolute bottom-4 z-20 w-[90%] xl:w-[60%] left-4">
                <p className="xl:text-2xl text-md md:text-lg text-primary">
                  Rank #{rating}
                </p>
                <div className="flex gap-x-2 my-3">
                  <Badge
                    variant="secondary"
                    className="rounded-none"
                    key={type}
                  >
                    {type}
                  </Badge>

                  <Badge
                    variant="secondary"
                    className="rounded-none"
                    key={totalEpisodes}
                  >
                    {totalEpisodes}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="rounded-none"
                    key={status}
                  >
                    {status}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="rounded-none"
                    key={releaseDate}
                  >
                    {releaseDate}
                  </Badge>
                </div>
                {/* Anime Title */}
                <h1
                  className="leading-relaxed xl:text-5xl text-3xl md:text-3xl text-secondary-foreground font-logo line-clamp-1"
                  style={{ color: color }}
                >
                  {title.english}
                </h1>

                {/* Anime Details */}
                <p className="w-[80%] lg:block leading-relaxed hidden md:!line-clamp-3">
                  {description.toString()}
                </p>

                {/* Buttons */}
                <div className="flex gap-x-2 mt-4 ">
                  <a
                    href={`/${id}`}
                    className={cn(
                      "flex",
                      buttonVariants({
                        variant: "default",
                        className: "rounded-none",
                      })
                    )}
                  >
                    <BsPlayCircleFill className="mr-3 h-5 w-5" /> Watch now
                  </a>
                  <Button disabled variant="secondary" className="rounded-none">
                    Details
                  </Button>
                </div>
              </div>
              <div className="absolute before:absolute before:w-full before:h-full before:bg-gradient-to-r before:from-white dark:before:from-black before:via-transparent before:to-transparent dark:before:to-transparent before:z-10 w-full xl:w-3/4 h-full right-0">
                <Image
                  objectFit="cover"
                  fill
                  src={cover}
                  alt="anime posters"
                  onError={(e) =>
                    (e.currentTarget.src = "/assets/placeholder.gif")
                  }
                  className="h-full w-full absolute opacity-75 saturate-150 object-cover pointer-events-none"
                />
              </div>
            </div>
          );
        }
      )}
    </ReactSimplyCarousel>
  );
};
