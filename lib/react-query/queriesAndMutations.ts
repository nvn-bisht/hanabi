"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";
import {
  fetchAnimeData,
  fetchAnimeInfo,
  getConsumetHomeData,
} from "./queryFunctions";
import { Anime } from "@/types/animeData";

//HOME PAGE DATA
export const useGetHomePageData = ({
  page,
  perPage,
}: {
  page: number;
  perPage: number;
}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CONSUMET_HOME_DATA],
    queryFn: () => getConsumetHomeData({ page: page, perPage: perPage }),
  });
};

//QUERY FOR ANIME INFO
export const useFetchAnimeInfo = ({
  animeId,
  provider,
}: {
  animeId: string;
  provider?: string;
}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ANIME_INFO],
    queryFn: () => fetchAnimeInfo({ animeId, provider }),
  });
};

//QUERY FOR ANIME INFO
export const useFetchAnimeData = ({
  animeId,
  provider,
}: {
  animeId: string;
  provider?: string;
}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ANIME_INFO],
    queryFn: () => fetchAnimeData(animeId, provider),
  });
};
