import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse , faHeart , faCalendar ,faChartLine } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
function Navbar() {
    return (
        <nav className="p-4 fixed bottom-0 left-1/2 -translate-x-1/2 z-10 md:static md:translate-0 md:w-1/4 lg:w-1/6 md:z-0">
            <div className="px-3">
                <ul className="flex justify-center p-3 gap-4 bg-black/60 light:bg-white/60 rounded-2xl whitespace-nowrap text-[clamp(0.7rem,1.5vw,0.8rem)] sm:text-sm md:text-lg md:leading-15 md:block md:gap-0 md:bg-transparent md:light:bg-transparent">
                   <li>
                        <NavLink to="/home"  className={({ isActive }) =>`flex items-baseline gap-2 hover:text-first-color/80 hover:light:text-gray-600/80 ${isActive ? "text-first-color light:text-gray-600" : "text-second-color"}`}>
                            <FontAwesomeIcon icon={faHouse} />
                            Home
                        </NavLink>
                    </li>
                   <li>
                       <NavLink to="/favorites"  className={({ isActive }) =>`flex items-baseline gap-2 hover:text-first-color/80 hover:light:text-gray-600/80 ${isActive ? "text-first-color light:text-gray-600" : "text-second-color"}`}>
                           <FontAwesomeIcon icon={faHeart} />
                           Favorites
                       </NavLink>
                   </li>
                   <li>
                       <NavLink to="/coming-soon" className={({ isActive }) =>`flex items-baseline gap-2 hover:text-first-color/80 hover:light:text-gray-600/80 ${isActive ? "text-first-color light:text-gray-600" : "text-second-color"}`}>
                           <FontAwesomeIcon icon={faCalendar} />
                           Coming Soon
                       </NavLink>
                   </li>
                   <li>
                       <NavLink to="/trending" className={({ isActive }) =>`flex items-baseline gap-2 hover:text-first-color/80 hover:light:text-gray-600/80 ${isActive ? "text-first-color light:text-gray-600" : "text-second-color"}`}>
                           <FontAwesomeIcon icon={faChartLine} />
                           Trending
                       </NavLink>
                   </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;