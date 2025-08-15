import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Home,
  Search,
  MovieDetailsPage,
  Favorites,
  ComingSoon,
  Trending,
  Login,
  Landing,
  PageNotFound,
  Register,
} from "./Pages";
import { createContext, useEffect, useState } from "react";
import { NoNavbar, NoTopbarNoNavbar, WithNavbar } from "./Layouts";

export const lightModeContext = createContext();

function App() {

  const [isLightMode, setIsLightMode] = useState(
    localStorage.getItem("isLightMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("isLightMode", isLightMode);
    document.querySelector("html").classList.toggle("light", isLightMode);
  }, [isLightMode]);

  return (
    <BrowserRouter>
      <lightModeContext.Provider value={{ isLightMode, setIsLightMode }}>
        <Routes>
          <Route element={<WithNavbar />}>
            <Route path="/home" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="/trending" element={<Trending />} />
          </Route>
          <Route element={<NoNavbar />}>
            <Route path="/search" element={<Search />} />
            <Route path="/movie/:id" element={<MovieDetailsPage />} />
          </Route>
          <Route element={<NoTopbarNoNavbar />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Landing />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </lightModeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
