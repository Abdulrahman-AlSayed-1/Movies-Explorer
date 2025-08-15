import { MovieDetails } from "../Components";
export default function MovieDetailsPage() {
  return (
    <section className="container flex items-center justify-center mx-auto">
      <div className="p-5 lg:p-0 lg:w-2/3">
        <MovieDetails />
      </div>
    </section>
  );
}
