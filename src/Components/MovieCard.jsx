import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, useState } from "react";
import placeHolderImage from "../assets/portrait_image_placeholder.png";
import { useNavigate } from "react-router";
import { addFavorite, removeFavorite } from "../Redux/Slices/favoritesSlice";
import { faHeart as fasHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

function MovieCard({ movie, styles, cardHeights }) {
  const [isImageLoadingOrNull, setIsImageLoadingorNull] = useState(true);
  const navigate = useNavigate();
  const {
    id,
    title ,
    release_date: date,
    poster_path,
    vote_average: rate,
    backdrop_path,
  } = movie;
  const [img, setImg] = useState(poster_path);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const handleLike = () => {
    !doesFavoriteExist()
      ? dispatch(addFavorite(movie))
      : dispatch(removeFavorite(movie));
  };
  const doesFavoriteExist = () => {
    return favorites.some((favorite) => favorite.id == id);
  };

  return (
    <>
      <div className={styles}>
        <div
          className={
            "overflow-hidden rounded-4xl w-full relative " + cardHeights
          }
        >
          <button
            className="w-full h-full cursor-pointer"
            onClick={() => {
              navigate(`/movie/${id}`);
              window.scrollTo(0, 0);
            }}
          >
            {isImageLoadingOrNull && (
              <img
                src={placeHolderImage}
                alt={title}
                className="h-full w-full object-cover absolute"
                loading="lazy"
              />
            )}
            <img
              src={`https://image.tmdb.org/t/p/original${img}`}
              alt={title}
              className="w-full h-full object-cover"
              loading="lazy"
              onLoad={(e) => {
                setIsImageLoadingorNull(false);
                if (e.target.width > e.target.height) setImg(backdrop_path);
              }}
            />
          </button>
        </div>
        <article className="p-3">
          <p className="text-sm text-first-color light:text-gray-600 truncate">
            {title}
          </p>
          <div className="flex justify-between items-center leading-tight">
            <div>
              <span className="text-xs text-second-color me-2 inline-block whitespace-nowrap">
                {date}
              </span>
              <span className="text-xs text-yellow-400 inline-block">
                <FontAwesomeIcon icon={faStar} /> {rate?.toFixed(1)}
              </span>
            </div>
            <div className="self-end">
                {localStorage.getItem("logged") &&
                <FontAwesomeIcon
                  onClick={handleLike}
                  icon={doesFavoriteExist() ? farHeart : fasHeart}
                  className={`text-xs cursor-pointer ${
                    doesFavoriteExist() ? "text-red-500" : "text-first-color light:text-gray-700"
                  }`}
                />
                }
            </div>
          </div>
        </article>
      </div>
    </>
  );
}

export default memo(MovieCard);
