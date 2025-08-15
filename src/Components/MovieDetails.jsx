import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router";
import placeHolderImage from "../assets/portrait_image_placeholder.png";
import useFetch from "../Custom_Hooks/useFetch";

export default function MovieDetails() {
  const { id } = useParams();
  const {
    data: movie,
    isLoading,
    isError,
    error,
  } = useFetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=d3485e66f87f432a97a02dd3849e542e`,
    ["movie details", id],
    !!id
  );
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="w-8 h-8 border-4 border-gray-300 border-y-transparent rounded-full animate-spin"></div>
      </div>
    );
  } else if (isError) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="md:text-2xl text-red-500 me-3"
        />
        <h3 className="md:text-2xl font-bold  text-first-color light:text-gray-700 text-center">
          {error.message || "Something went wrong. Try again."}
        </h3>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-12 my-5 overflow-hidden rounded-2xl bg-gray-800 light:bg-gray-300 shadow-gray-700 shadow-lg">
      <div className="col-span-12 md:col-span-6 lg:col-span-7 order-2 md:order-1 p-3">
        <h5 className="text-3xl text-center font-bold text-first-color light:text-gray-700">
          {movie.title}
        </h5>
        <ul className="mt-3">
          <li>
            <span className="font-bold text-first-color light:text-gray-700">
              Release Date:{" "}
            </span>
            <span className="font-light text-sm text-second-color light:text-gray-600">
              {movie.release_date}
            </span>
          </li>
          <li>
            <span className="font-bold  text-first-color light:text-gray-700">
              Rating:
            </span>{" "}
            <span className="font-light text-sm text-second-color light:text-gray-600">
              {movie.vote_average.toFixed(1)}
            </span>
          </li>
          <li>
            <span className="font-bold  text-first-color light:text-gray-700">
              For Adults:
            </span>{" "}
            <span className="font-light text-sm text-second-color light:text-gray-600">
              {movie.adult ? "YES" : "NO"}
            </span>
          </li>
          <li>
            <span className="font-bold  text-first-color light:text-gray-700">
              Genres:
            </span>{" "}
            <span className="font-light text-sm text-second-color light:text-gray-600">
              {movie.genres.map((genre) => genre.name).join(", ")}
            </span>
          </li>
          <li>
            <span className="font-bold  text-first-color light:text-gray-700">
              Runtime:
            </span>{" "}
            <span className="font-light text-sm text-second-color light:text-gray-600">
              {movie.runtime} minutes
            </span>
          </li>
          <li>
            <span className="font-bold  text-first-color light:text-gray-700">
              Production Companies:
            </span>{" "}
            <span className="font-light text-sm text-second-color light:text-gray-600">
              {movie.production_companies
                .map((company) => company.name)
                .join(", ")}
            </span>
          </li>
          <li>
            <span className="font-bold  text-first-color light:text-gray-700">
              Languages:
            </span>{" "}
            <span className="font-light text-sm text-second-color light:text-gray-600">
              {movie.spoken_languages.map((lang) => lang.name).join(", ")}
            </span>
          </li>
          <li>
            <span className="font-bold  text-first-color light:text-gray-700">
              Status:
            </span>{" "}
            <span className="font-light text-sm text-second-color light:text-gray-600">
              {movie.status}
            </span>
          </li>
          <li>
            <span className="font-bold  text-first-color light:text-gray-700">
              Tagline:
            </span>{" "}
            <span className="font-light text-sm text-second-color light:text-gray-600">
              {movie.tagline || "No tagline available"}
            </span>
          </li>
          <li>
            <span className="font-bold  text-first-color light:text-gray-700">
              Budget:
            </span>{" "}
            <span className="font-light text-sm text-second-color light:text-gray-600">
              ${movie.budget.toString()}
            </span>
          </li>
        </ul>
      </div>
      <div className="col-span-12 md:col-span-6 lg:col-span-5 order-1 md:order-2">
        <img
          src={`${
            movie.poster_path
              ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
              : placeHolderImage
          }`}
          alt={movie.title}
          className="lg:ms-auto lg:max-h-[50vh] lg:max-w-full"
        />
      </div>
      <div className="col-span-12 text-first-color light:text-gray-700 p-3 order-3">
        <h6 className="font-bold mb-3 text-xl">Overview</h6>
        <p className="font-semibold">{movie.overview}</p>
      </div>
    </div>
  );
}
