import { Outlet } from "react-router";
import { Footer } from "../Components";

export default function NoTopbarNoNavbar() {
  return (
     <div className="flex flex-col w-screen min-h-dvh">
         <main className="grow relative flex">
           <Outlet/>
         </main>
         <Footer/>
     </div>
  )
}
