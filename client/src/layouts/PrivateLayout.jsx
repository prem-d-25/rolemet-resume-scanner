import { Outlet } from "react-router-dom";

function PrivateLayout() {
  return (
    <>
      <h2>Navbar</h2>
      <h2>Sidebar</h2>      

      <Outlet />
    </>
  );
}

export default PrivateLayout;