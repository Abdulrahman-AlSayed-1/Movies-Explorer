import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MovieCard } from "../Components";
import { useSearchParams } from "react-router-dom";
import useFetch from "../Custom_Hooks/useFetch";
FontAwesomeIcon
function Search() {
    const [searchParams] = useSearchParams({movieName:""});
    const {data , isLoading , isError , error} = useFetch(`https://api.themoviedb.org/3/search/movie?query=${searchParams.get("movieName")}&api_key=d3485e66f87f432a97a02dd3849e542e`,["movies" , searchParams.get("movieName")])
  
    if(isLoading)
    {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <div className="w-8 h-8 border-4 border-gray-300 border-y-transparent rounded-full animate-spin"></div>
            </div>
        );
    }
    else if(isError)
    {
        return (
              <div className="flex justify-center items-center h-[80vh]">
                <FontAwesomeIcon icon={faCircleXmark} className="md:text-2xl text-red-500 me-3" />
                <h3 className="md:text-2xl font-bold  text-first-color light:text-gray-700 text-center">{error}</h3>
              </div>
        );
    }
    return ( 
        <section className="container mx-auto p-3">
          <h2 className="text-xl md:text-2xl ps-3 font-bold mb-4 relative text-first-color light:text-gray-700">Search Results</h2>
         { data.results.length ? 
          <div className="grid grid-cols-12 gap-3">
            {data.results.map(movie => (
              <MovieCard
              movie={movie}
              styles="col-span-4 md:col-span-3 lg:col-span-2 overflow-hidden"
              cardHeights= "[height:200px] md:[height:250px] lg:[height:300px]"
              key={movie.id}
              />
            ))}
          </div> :(
            <div className="absolute top-1/2 left-1/2 translate-[-50%]">
              <h4 className="text-xl md:text-2xl font-bold text-first-color light:text-gray-700 text-center">No Results Found.</h4>
            </div>
          )
         } 
        </section>
     );
}

export default Search;

