import Image from "next/image";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { InformationCircleIcon } from "@heroicons/react/outline";
import { Movie } from "../typings";
import { baseUrl } from "../constants/movie";
import { modalState, movieState } from "../atoms/modalAtom.";
import { useRecoilState } from "recoil";

interface Props {
  netflixOriginals: Movie[];
}

const Banner = ({ netflixOriginals }: Props) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const [showModal, setShowModal] = useRecoilState(modalState);

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);

  return (
    <div className="flex flex-col space-y-4 pt-32 pb-16 md:space-y-7 lg:h-[65vh] lg:pb-32">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen m-0">
        <Image
          layout="fill"
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          objectFit="cover"
        />
      </div>

      <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl md:max-w-4xl">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
        {movie?.overview}
      </p>
      <div className="flex space-x-3">
        <button className="bannerButton bg-white text-black">
          <FaPlay className="h-3 w-3 text-black md:h-7 md:w-7" />
          Play
        </button>

        <button
          className="bannerButton bg-[gray]/70"
          onClick={() => {
            setCurrentMovie(movie);
            setShowModal(true);
          }}
        >
          <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" /> More Info
        </button>
      </div>
    </div>
  );
};

export default Banner;
