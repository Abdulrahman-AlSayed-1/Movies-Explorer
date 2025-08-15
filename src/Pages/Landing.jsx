import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="relative h-[100dvh] w-screen landing overflow-y-hidden">
      <div className="h-full w-full flex items-end md:items-center [background:linear-gradient(to_top,rgba(0,0,0,0.7)_40%,transparent)] md:[background:linear-gradient(to_right,black_30%,transparent)]">
          <div className="p-5 md:p-10 ">
            <p className="text-lg md:text-xl translate-text secondary-main-text text-gray-600">
              Discover trending movies & more
            </p>
            <h1 className="text-[13vw] md:text-6xl lg:text-7xl font-bold mb-3 tracking-widest translate-text primary-main-text text-gray-500">
              MovieSpace
            </h1>
            <p className="text-sm md:text-base text-gray-700 md:max-w-1/2 lg:max-w-1/3 tracking-tight translate-text">
              Welcome to MovieSpace, your ultimate destination to discover,
              browse, and track movies effortlessly. Explore ratings, trailers,
              reviews, and recommendations, all in one interactive and
              user-friendly platform.
            </p>
            <div className="flex gap-3 pt-4">
              <Link
                to="/home"
                className="text-gray-400 text-xs md:text-sm px-6 py-2 rounded-md shadow-md hover:text-gray-500 border-b transition first-link translate-text"
              >
                Discover
              </Link>
              <Link
                to="/register"
                className="text-gray-400 text-xs md:text-sm px-6 py-2 rounded-md shadow-md hover:text-gray-500 border-b transition second-link translate-text"
              >
                Register
              </Link>
            </div>
          </div>
      </div>
    </div>
  );
}
