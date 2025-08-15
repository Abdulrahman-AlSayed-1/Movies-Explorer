import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  MovieCard, Navbar } from "../Components";
import useFetch from "../Custom_Hooks/useFetch";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
export default function Trending() {
  const { data, isError, isLoading, error } = useFetch(
    "https://api.themoviedb.org/3/trending/movie/week?api_key=d3485e66f87f432a97a02dd3849e542e",
    ["trending"]
  );
  if (isLoading) {
    return (
      <div className="flex justify-center items-center [height:180px] md:[height:250px]">
        <div className="w-8 h-8 border-4 border-gray-300 border-y-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <main className="flex">
      <Navbar />
      <section className="w-screen p-3 md:pe-5 mx-auto md:mx-0">
        <h2 className="text-first-color text-3xl md:ms-3 mb-5 text-center md:text-start light:text-gray-700">
          Trending{" "}
          <small className="text-xs text-second-color light:text-gray-600">
            This Week
          </small>
        </h2>
        {isError ? (
          <p className="ms-3 text-second-color light:text-gray-700">
            <FontAwesomeIcon
              icon={faExclamationCircle}
              className="text-red-500"
            />{" "}
            {error}
          </p>
        ) : (
          <div className="flex flex-wrap gap-4">
            {data.results.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                styles="flex-[1_0_45%] md:flex-[1_0_25%] lg:flex-[1_0_18%] overflow-hidden"
                cardHeights="h-[250px] md:h-[300px] lg:h-[350px]"
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
