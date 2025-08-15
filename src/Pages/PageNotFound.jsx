import {
  faArrowAltCircleLeft,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
export default function PageNotFound() {
  return (
      <div className="grow flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-y-3">
          <div className="text-3xl">
            <FontAwesomeIcon icon={faTimesCircle} className="text-red-600" />
            <span className="text-font ms-3 text-first-color light:text-gray-700">
              Page Not Found
            </span>
          </div>
          <Link
            to="/home"
            className="px-4 py-2 border-b text-first-color hover:text-second-color  light:text-gray-700 hover:light:text-gray-800 rounded-lg"
          >
            <FontAwesomeIcon icon={faArrowAltCircleLeft} className="me-2" />
            Return to Home
          </Link>
        </div>
      </div>
  );
}
