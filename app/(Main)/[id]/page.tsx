"use client";

import AnimeDetails from "@/components/card/details-card";
import { useFetchAnimeData } from "@/lib/react-query/queriesAndMutations";
import Image from "next/image";

type InfoPageProps = {
  params: { id: string };
};

const AnimePage = ({ params }: InfoPageProps) => {
  const { data, isLoading, isError } = useFetchAnimeData({
    animeId: params.id,
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <p>Error..</p>;

  return (
    <section className="relative h-auto">
      <div className="absolute w-full h-full -z-10">
        <Image
          fill
          src={data?.image!}
          alt="anime poster"
          loading="lazy"
          className="h-full w-full opacity-20 blur-lg object-cover"
        />
      </div>

      <AnimeDetails animeData={data} />

      {/* <div className="flex max-w-screen-2xl mx-auto w-full xl:px-0 px-4 gap-3 flex-wrap">

      </div> */}
    </section>
  );
};
export default AnimePage;
