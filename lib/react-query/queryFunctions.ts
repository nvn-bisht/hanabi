import {
  createCache,
  fetchData,
  FetchOptions,
  generateCacheKey,
} from "@/lib/handleCache";
import { getCurrentSeason, year } from "../utils";

// const primaryUrl =
//   process.env.NODE_ENV !== "production"
//     ? "http://localhost:4000"
//     : process.env.NEXT_ANIME_URL;

// Individual caches for different types of data
// Creating caches for anime data, anime info, and video sources
const advancedSearchCache = createCache("Advanced Search");
const animeDataCache = createCache("Data");
const animeInfoCache = createCache("Info");
const animeEpisodesCache = createCache("Episodes");
const fetchAnimeEmbeddedEpisodesCache = createCache("Video Embedded Sources");
const videoSourcesCache = createCache("Video Sources");

///// Utility function to ensure URL ends with a slash /////
function ensureUrlEndsWithSlash(url: string): string {
  return url.endsWith("/") ? url : `${url}/`;
}
///// BASE URL /////
const BASE_URL = ensureUrlEndsWithSlash(
  process.env.NODE_ENV !== "production"
    ? (process.env.NEXT_PUBLIC_BACKEND_URL as string)
    : (process.env.NEXT_PUBLIC_BACKEND_URL as string)
);

///// Function for ADVANCED_SEARCH /////
export async function fetchAdvancedSearch(
  searchQuery: string = "",
  page: number = 1,
  perPage: number = 20,
  options: FetchOptions = {}
) {
  const queryParams = new URLSearchParams({
    ...(searchQuery && { query: searchQuery }),
    page: page.toString(),
    perPage: perPage.toString(),
    type: options.type ?? "ANIME",
    ...(options.season && { season: options.season }),
    ...(options.format && { format: options.format }),
    ...(options.id && { id: options.id }),
    ...(options.year && { year: options.year }),
    ...(options.status && { status: options.status }),
    ...(options.sort && { sort: JSON.stringify(options.sort) }),
  });

  if (options.genres && options.genres.length > 0) {
    // Correctly encode genres as a JSON array
    queryParams.set("genres", JSON.stringify(options.genres));
  }
  const url = `${BASE_URL}meta/anilist/advanced-search?${queryParams.toString()}`;
  const cacheKey = generateCacheKey("advancedSearch", queryParams.toString());

  return fetchData(url, advancedSearchCache, cacheKey);
}

///// Fetch Anime DATA Function /////
export async function fetchAnimeData(
  animeId: string,
  provider: string = "gogoanime"
) {
  const params = new URLSearchParams({ provider });
  const url = `${BASE_URL}meta/anilist/data/${animeId}?${params.toString()}`;
  const cacheKey = generateCacheKey("animeData", animeId, provider);

  return fetchData(url, animeDataCache, cacheKey);
}

///// Fetch Anime INFO Function /////
export async function fetchAnimeInfo({
  animeId,
  provider = "gogoanime",
}: {
  animeId: string;
  provider?: string;
}) {
  const params = new URLSearchParams({ provider });
  const url = `${BASE_URL}meta/anilist/info/${animeId}?${params.toString()}`;
  const cacheKey = generateCacheKey("animeInfo", animeId, provider);

  return fetchData(url, animeInfoCache, cacheKey);
}

///// HOME DATA FUNCTION /////
export const getConsumetHomeData = async ({
  page,
  perPage,
}: {
  page: number;
  perPage: number;
}) => {
  const url1 = `${BASE_URL}meta/anilist/advanced-search?sort=["SCORE_DESC"]&page=${page}&perPage=${perPage}`;
  const url2 = `${BASE_URL}meta/anilist/trending?perPage=${perPage}&page=${page}`;
  const url3 = `${BASE_URL}meta/anilist/popular?perPage=${perPage}&page=${page}`;
  const url4 = `${BASE_URL}meta/anilist/advanced-search?type=ANIME&year=${year}`;

  const [response1, response2, response3, response4] = await Promise.all([
    fetch(url1),
    fetch(url2),
    fetch(url3),
    fetch(url4),
  ]);

  if (!response1.ok || !response2.ok || !response3.ok || !response4.ok) {
    throw new Error("Network response was not ok");
  }

  // Parse the responses as JSON
  const mostScored = await response1.json();
  const trendingAnime = await response2.json();
  const popularAnime = await response3.json();
  const topAiring = await response4.json();

  const combinedData = {
    mostScored,
    trendingAnime,
    popularAnime,
    topAiring,
  };

  return combinedData;
};

///// ANIME EPISODES FUNCTION /////
export async function fetchAnimeEpisodes({
  animeId,
  provider = "zoro",
  dub = false,
}: {
  animeId: string;
  provider: string;
  dub?: boolean;
}) {
  const params = new URLSearchParams({ provider, dub: dub ? "true" : "false" });
  const url = `${BASE_URL}meta/anilist/episodes/${animeId}?${params.toString()}`;
  const cacheKey = generateCacheKey(
    "animeEpisodes",
    animeId,
    provider,
    dub ? "dub" : "sub"
  );

  return fetchData(url, animeEpisodesCache, cacheKey);
}

export async function fetchAnimeStreamingLinks({
  episodeId,
}: {
  episodeId: string;
}) {
  const url = `${BASE_URL}meta/anilist/watch/${episodeId}`;
  const cacheKey = generateCacheKey("animeStreamingLinks", episodeId);

  return fetchData(url, videoSourcesCache, cacheKey);
}
