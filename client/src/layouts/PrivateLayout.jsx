import Navbar from "@/components/common/Navbar";
import { Outlet } from "react-router-dom";

function PrivateLayout() {
  return (
    <>
      <div className="min-h-screen bg-[#ffffff]">
        <Navbar />
        <main  className="mx-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default PrivateLayout;