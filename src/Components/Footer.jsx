import img from "../assets/LogoNoBg.png"
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router";
function Footer() {
  const location = useLocation()
    return ( 
        <div className={`p-2 container block ${location.pathname === "/" && "hidden md:flex fixed bottom-0 left-1/2 -translate-x-1/2 z-10"} flex mx-auto`}>
           <div className="w-1/2 flex items-center">
             <img src={img} alt="Website Logo" className={`w-10 md:w-14 inline-block ${location.pathname !=="/" && "light:invert"}`} />
             <span className="text-xxs text-second-color light:text-gray-500 inline-block ms-3">&copy; MovieSpace 2025. All Rights Reserved</span>
           </div>
           <div className="w-1/2 pe-3 flex items-center justify-end">
             <ul className="flex gap-3">
                 <li className="flex justify-center items-center w-8 h- rounded-full hover:rotate-360 transition-all duration-500 ">
                     <a className={`text-gray-400 ${location.pathname !=="/" && "light:text-gray-600"}`} href="https://www.linkedin.com/in/abdulrahmanal-sayed" rel="noopener noreferrer" target="_blank">
                       <FontAwesomeIcon icon={faLinkedin} size="xl" />
                     </a>
                 </li>
                  <li className="flex justify-center items-center w-8 h-8 rounded-full hover:rotate-360 transition-all duration-500">
                      <a className={`text-gray-400 ${location.pathname !=="/" && "light:text-gray-600"}`} href="https://github.com/Abdulrahman-AlSayed-1" rel="noopener noreferrer" target="_blank">
                       <FontAwesomeIcon icon={faGithub} size="xl" />
                      </a>
                  </li>
             </ul>
           </div>
        </div>
     );
}

export default Footer;