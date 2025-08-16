import logo from "../assets/LogoNoBg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { lightModeContext } from "../App";
function Topbar() {
  const navigate = useNavigate();
  const {isLightMode, setIsLightMode} = useContext(lightModeContext)

  const toggleLightMode = () => {
    setIsLightMode(!isLightMode);
  };
  return (
    <header className="w-screen sticky top-0 bg-background-color/90 z-10">
      <div className="grid grid-cols-12 p-3">
        <Link
          to="/home"
          className="col-span-6 md:col-span-3 lg:col-span-2 order-1 flex items-center"
        >
          <img
            src={logo}
            alt="MovieSpace"
            className="w-10 md:w-14 inline light:invert"
          />
          <span className="text-white light:text-gray-600 font-semibold text-[clamp(0.7rem,1vw,1rem)] ms-3">
            MovieSpace
          </span>
        </Link>
        <div className="col-span-12 md:col-span-6 lg:col-span-8 order-3 mt-1 md:mt-0 md:px-5 md:order-2 flex items-center justify-center">
          <div className="relative w-full">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-second-color"
            />
            <input
              type="search"
              placeholder="Action, Adventure, Comedy..."
              className="w-full bg-second-color/10 light:bg-gray-300 text-second-color light:text-gray-600 py-2 ps-8 pe-2 rounded-lg outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter")
                  navigate(`/search?movieName=${e.target.value}`);
              }}
            />
          </div>
        </div>
        <div className="col-span-6 md:col-span-3 lg:col-span-2 order-2 md:order-3 flex items-center justify-end gap-3">
          <label className="relative flex items-center cursor-pointer">
            <input
              onChange={toggleLightMode}
              type="checkbox"
              checked={isLightMode}
              className="sr-only peer"
            />
            <div className="w-14 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer-checked:bg-white peer-checked:after:translate-x-8 after:content-[''] after:text-xs after:text-center after:absolute after:top-[2px] after:left-[2px] after:bg-gray-500 after:rounded-full after:h-5 after:w-5 after:transition-all after:duration-500 transition-all duration-500">
              <FontAwesomeIcon
                icon={faMoon}
                className={`absolute z-2 text-xs left-2 top-1/2 transform -translate-y-1/2 text-gray-600 transition-all duration-700 ${
                  isLightMode ? "" : "sr-only"
                }`}
              />
              <FontAwesomeIcon
                icon={faSun}
                className={`absolute z-2 text-xs text-white right-1.5 top-1/2 transform -translate-y-1/2 transition-all duration-700 ${
                  isLightMode ? "sr-only" : ""
                }`}
              />
            </div>
          </label>
          {!localStorage.getItem("logged") ? (
            <button className="w-32 py-3 bg-second-color/20 light:bg-second-color text-white rounded-xl hover:bg-second-color/30 light:hover:bg-second-color/80 cursor-pointer">
              <Link to="/login">Login</Link>
            </button>
          ) : (
            <button
              className="w-32 py-3 bg-second-color/20 light:bg-second-color text-white rounded-xl hover:bg-second-color/30 light:hover:bg-second-color/80 cursor-pointer"
              onClick={() => {
                localStorage.removeItem("logged");
                navigate("/login");
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Topbar;
