"use client";

import WatchPage from "@/components/watch/watch-page";
import {
  useFetchAnimeData,
  useFetchAnimeEpisodes,
} from "@/lib/react-query/queriesAndMutations";

interface WatchProps {
  params: { id: string };
}

const Page = ({ params }: WatchProps) => {
  const {
    data: episodes,
    isLoading,
    isError,
  } = useFetchAnimeEpisodes({ animeId: params.id });
  const { data: animeData } = useFetchAnimeData({ animeId: params.id });

  if (isLoading) return <div>Loading...</div>;

  return <WatchPage animeData={animeData} episodes={episodes} />;
};

export default Page;
