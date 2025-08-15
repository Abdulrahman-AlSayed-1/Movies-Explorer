import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  faChevronLeft,
  faChevronRight,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fasHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../Redux/Slices/favoritesSlice";
import { useFetchGenres } from "../Custom_Hooks/useFetchGenres";
import useFetch from "../Custom_Hooks/useFetch";

function SlideShow() {
  const { data, isLoading, isError } = useFetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=d3485e66f87f432a97a02dd3849e542e",
    ["slices"]
  );

  const slidesPosters =useMemo(() => {
    const slidePosters = [];
    if (!data) return [];
    for (let resultIndex = 0; resultIndex < 7; resultIndex++)
      slidePosters.push(
        `https://image.tmdb.org/t/p/original${data.results[resultIndex].backdrop_path}`
      );
    return slidePosters;
  },[data]);

  const [selected, setSelected] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(); // Initialize selected index on first render
    emblaApi.on("select", onSelect);
  }, [onSelect]);

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const  genres  = useFetchGenres();

  const handleLike = () => {
    !doesFavoriteExist(data.results[selected].id)
      ? dispatch(addFavorite(data.results[selected]))
      : dispatch(removeFavorite(data.results[selected]));
  };
  const doesFavoriteExist = (id) => {
    return favorites.some((favorite) => favorite.id === id);
  };

  if (isError) console.log("Error in Fetching Slides "+ isError);
  else if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-8 h-8 border-4 border-gray-300 border-y-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const scrollTrigger = (arrow) => {
    arrow == "prevArrow" ? emblaApi.scrollPrev() : emblaApi.scrollNext();
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {slidesPosters.map((poster, index) => {
              return (
                <div
                  className={"flex-[0_0_100%] md:flex-[0_0_85%] lg:flex-[0_0_70%] relative rounded-2xl overflow-hidden transition-all duration-700 ".concat(
                    selected == index
                      ? "scale-100 brightness-100"
                      : "scale-95 brightness-25"
                  )}
                  key={poster}
                >
                  <img
                    className="filter"
                    src={poster}
                    alt={`poster ${index}`}
                  />
                  <div className="absolute inset-0 bg-black/30">
                    <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between">
                      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-second-color/40">
                        <FontAwesomeIcon
                          icon={faPlay}
                          className="text-first-color text-lg"
                        />
                      </div>
                      <div className="ps-2 flex-[1_0]">
                        <p className="text-xs font-semibold text-first-color">
                          {data.results[index].original_title}
                        </p>
                      </div>
                      {localStorage.getItem("logged") &&
                      <div className="flex justify-center items-center p-3 w-5 h-5 rounded-full border cursor-pointer text-first-color">
                        <FontAwesomeIcon
                          onClick={handleLike}
                          icon={
                            doesFavoriteExist(data.results[index].id)
                              ? farHeart
                              : fasHeart
                          }
                          className={`text-xs ${
                            doesFavoriteExist(data.results[index].id)
                              ? "text-red-500"
                              : ""
                          }`}
                        />
                      </div>
                       }
                    </div>
                    <div className="absolute left-2.5 top-2.5">
                      {genres(data.results[index].genre_ids).map(
                        (genre, idx) => (
                          <span
                            key={idx}
                            className="bg-second-color/40 text-first-color text-xxs rounded-full px-2.5 py-1 font-semibold mr-1 inline-block"
                          >
                            {genre}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-1 p-2 self-end">
          <button
            className="w-10 h-10 bg-second-color/10 light:bg-second-color/50 rounded-lg hover:bg-second-color/15  hover:light:bg-second-color/60 transition-all cursor-pointer"
            onClick={() => {
              scrollTrigger("prevArrow");
            }}
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="text-gray-300 light:text-gray-50 text-sm"
            />
          </button>
          <button
            className="ml-2 w-10 h-10 bg-second-color/10  light:bg-second-color/50 rounded-lg hover:bg-second-color/15  hover:light:bg-second-color/60 transition-all cursor-pointer"
            onClick={() => {
              scrollTrigger("nextArrow");
            }}
          >
            <FontAwesomeIcon
              icon={faChevronRight}
              className="text-gray-300 light:text-gray-50 text-sm"
            />
          </button>
        </div>
      </div>
    </>
  );
}

export default SlideShow;
