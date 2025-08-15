import { Outlet } from "react-router";
import { Footer, Topbar } from "../Components";

export default function WithNavbar() {
  return (
    <div className="flex flex-col w-screen min-h-dvh pb-16 md:pb-0">
      <Topbar />
      <main className="grow relative">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
