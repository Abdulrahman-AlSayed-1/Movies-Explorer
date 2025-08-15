import { useNavigate } from "react-router";
import {  MovieCard, Navbar } from "../Components";
import { useSelector } from "react-redux";
import { useEffect } from "react";
export default function Favorites() {
  const favorites = useSelector((state) => state.favorites);
  const navigate = useNavigate()
  useEffect(()=>{
    if(!localStorage.getItem("logged"))
    {
        alert("You must login to Access this page")
        navigate("/login")
    }
  },[])
 
  return (
    <main className="flex">
      <Navbar />
      <section className="w-screen p-3 md:pe-5 mx-auto md:mx-0">
        <h2 className="text-first-color text-3xl ms-3 mb-5 text-center md:text-start light:text-gray-700">
          Favorites
        </h2>
        {!favorites.length && (
          <p className="ms-3 text-second-color light:text-gray-700">
            Favorites List is Empty
          </p>
        )}
        <div className="flex flex-wrap gap-4">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              styles="flex-[1_0_45%] md:flex-[1_0_25%] lg:flex-[1_0_18%] overflow-hidden"
              cardHeights="h-[250px] md:h-[300px] lg:h-[350px]"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
