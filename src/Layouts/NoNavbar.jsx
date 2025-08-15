import { Outlet } from "react-router";
import { Footer, Topbar } from "../Components";

export default function NoNavbar() {
  return (
    <div className="flex flex-col w-screen min-h-dvh">
      <Topbar />
      <main className="grow relative">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
