import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface AnilistInfo {
  id: string;
  malId?: number | null;
  title: {
    english: string;
    native: string | undefined;
    romaji: string | undefined;
    userPreferred: string | undefined;
  };
  synonyms?: string[] | null;
  isLicensed?: boolean | null;
  isAdult?: boolean | null;
  countryOfOrigin?: string | null;
  trailer?: {
    id: string;
    site: string | null;
    thumbnail: string | null;
  } | null;
  cover: string | StaticImport;
  popularity?: number | null;
  color?: string;
  image: string | StaticImport;
  description: string | TrustedHTML;
  status: string;
  releaseDate?: number | null;
  startDate: {
    day?: number | null;
    month?: number | null;
    year?: number | null;
  };
  year: number | null;
  endDate: {
    day?: number | null;
    month?: number | null;
    year?: number | null;
  };
  averageRating?: number | null;
  nextAiringEpisode?: {
    airingTime: number | null;
    timeUntilAiring: number | null;
    episode: number | null;
  } | null;
  totalEpisodes: number | null;
  currentEpisode: number | null;
  rating?: number | null;
  duration?: number | null;
  genres?: string[] | null;
  season?: string | null;
  studios?: string[] | null;
  format: "TV" | "TV_SHORT" | "MOVIE" | "ONA" | "OVA" | "UNKNOWN";
  studiosInfo?:
    | {
        name: string;
        id: string;
        isMain: boolean;
      }[]
    | null;
  type?: string | null;
  mappings?: MappingItem[] | null;
  characters?: Character[] | null;
  recommendations?:
    | {
        id: string | null;
        malId: number | null;
        title: {
          romaji: string | null;
          english: string | null;
          native: string | null;
          userPreferred: string | null;
        };
        status: string;
        totalEpisodes?: number | null;
        image: string | null;
        cover: string | null;
        rating?: number | null;
        type: string | null;
      }[]
    | null;
  relations?: RelationData[] | null;
  episodes: Episode[];
}

export interface Episode {
  id: string;
  title: string;
  description: string | null;
  number: number;
  image: string;
  imageHash: string;
  airDate: string | null;
}

export interface RelationData {
  id: string;
  relationType: string;
  malId?: number | null;
  title: {
    romaji: string | null;
    english: string | null;
    native: string | null;
    userPreferred: string | null;
  };
  season: string | null;
  seasonYear: number | null;
  status: string;
  episodes?: number | null;
  image: string | StaticImport;
  color?: string | null;
  type: string | null;
  cover: string | StaticImport;
  rating?: number | null;
}

export interface MappingItem {
  id: string;
  providerId: string;
}

interface Character {
  name: string;
  image: string;
  voiceActor: VoiceActor;
}

interface VoiceActor {
  name: string;
  image: string;
}
