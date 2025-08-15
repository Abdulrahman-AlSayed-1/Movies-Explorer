import { SlideShow,  Navbar  ,FilterBar } from "../Components";
function Home() {
  
  return (
    <>
      <main className="flex flex-wrap justify-center">
        <Navbar/>
        <section className="w-full px-2 md:w-3/4 lg:w-5/6 md:pe-5 md:ps-0">
            <SlideShow/>
        </section>
        <section className="w-full px-2 md:px-0 md:w-5/6">
            <FilterBar/>
        </section>
      </main>
    </>
  );
}
export default Home;
