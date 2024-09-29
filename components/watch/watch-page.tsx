import { Anime } from "@/types/animeData";
import { Episode } from "@/types/info";
import AnimeInfo from "./anime-info";

interface WatchPageProps {
  animeData: Anime;
  episodes: Episode[];
}

const WatchPage = ({ animeData, episodes }: WatchPageProps) => {
  console.log(animeData);

  return (
    <section className="relative w-full h-auto">
      <div className="my-4 2xl:max-w-screen-2xl lg:max-w-5xl mx-auto">
        <AnimeInfo />
      </div>
    </section>
  );
};
export default WatchPage;
