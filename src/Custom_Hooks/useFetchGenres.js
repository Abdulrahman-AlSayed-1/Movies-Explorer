import useFetch from "./useFetch";
export const useFetchGenres = () => {
  const { data, isError } = useFetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=d3485e66f87f432a97a02dd3849e542e",
    ["genres"]
  );
  const genres = (ids) => {
     if (isError) {
      console.log("Error fetching genres:", isError);
      return [];
    }
    return ids.map((id) => data?.genres.find((genre) => genre.id === id).name);
  };
  return  genres ;
};
