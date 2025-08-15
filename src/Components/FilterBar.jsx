import { useEffect, useRef, useState } from "react";
import useFetch from "../Custom_Hooks/useFetch";
import MovieCard from "./MovieCard";

function FilterBar() {
  const [activeGenreID, setActiveGenreID] = useState(null);
  const genresRes = useFetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=d3485e66f87f432a97a02dd3849e542e",
    ["genres"]
  );
  const movies = useFetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=d3485e66f87f432a97a02dd3849e542e&with_genres=${activeGenreID}`,
    ["discover", activeGenreID],
    !!activeGenreID
  );

  const activeButton = useRef(null);

  useEffect(() => {
    if (genresRes.data) {
      setActiveGenreID(genresRes.data.genres[0].id);
    }
  }, [genresRes.data]);

  if (genresRes.isError)
    console.error("Error in fetching genres " + genresRes.error);
  if (movies.isError) console.error("Error in fetching movies " + movies.error);

  const activeClasses = [
    "light:bg-gray-600",
    "bg-first-color",
    "light:text-gray-100",
    "text-gray-600",
    "hover:bg-first-color/90",
    "hover:light:bg-gray-600/90",
  ];

  const inactiveClasses = [
    "bg-second-color/20",
    "light:text-gray-600",
    "text-first-color",
    "hover:bg-second-color/50",
    "hover:light:bg-gray-600/30",
  ];
  const toggleStyles = (element, removeClasses, addClasses) => {
    if (!element) return;
    element.classList.remove(...removeClasses);
    element.classList.add(...addClasses);
  };

  const activateButton = (e, id) => {
    toggleStyles(activeButton.current, activeClasses, inactiveClasses);
    activeButton.current = e.target;
    toggleStyles(activeButton.current, inactiveClasses, activeClasses);
    setActiveGenreID(id);
  };

  const maskImage = (e) => {
    const distanseToEnd =
      e.target.scrollWidth - e.target.clientWidth - e.target.scrollLeft;
    const distanceToStart = e.target.scrollLeft;

    e.target.classList.remove(
      "[mask-image:radial-gradient(circle_at_left,white_80%,transparent)]",
      "[mask-image:radial-gradient(circle_at_right,white_80%,transparent)]",
      "[mask-image:radial-gradient(circle_at_center,white_80%,transparent)]"
    );
    if (distanseToEnd < 10)
      e.target.classList.add(
        "[mask-image:radial-gradient(circle_at_right,white_80%,transparent)]"
      );
    else if (distanceToStart < 10)
      e.target.classList.add(
        "[mask-image:radial-gradient(circle_at_left,white_80%,transparent)]"
      );
    else
      e.target.classList.add(
        "[mask-image:radial-gradient(circle_at_center,white_80%,transparent)]"
      );
  };
  return (
    <>
      <ul
        onScroll={maskImage}
        className="flex items-center gap-1 overflow-auto mb-5 [mask-image:radial-gradient(circle_at_left,white_80%,transparent)] hide-scrollbar"
      >
        {genresRes.data?.genres.map((genre) => (
          <li
            key={genre.id}
            onClick={(e) => activateButton(e, genre.id)}
            className={`whitespace-nowrap text-sm px-5 py-2 rounded-2xl cursor-pointer ${
              activeGenreID === genre.id
                ? activeClasses.join(" ")
                : inactiveClasses.join(" ")
            }`}
          >
            {genre.name}
          </li>
        ))}
      </ul>
      {movies.isLoading ? (
        <div className="flex justify-center items-center h-[180px] md:h-[250px]">
          <div className="w-8 h-8 border-4 border-gray-300 border-y-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div
          onScroll={maskImage}
          className="flex overflow-auto gap-3 hide-scrollbar [mask-image:radial-gradient(circle_at_left,white_80%,transparent)]"
        >
          {movies.data?.results.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              styles="flex-[0_0_140px] md:flex-[0_0_180px] overflow-hidden"
              cardHeights="h-[180px] md:h-[250px]"
            />
          ))}
        </div>
      )}
    </>
  );
}

export default FilterBar;
