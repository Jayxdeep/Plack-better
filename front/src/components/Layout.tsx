import { Outlet } from "react-router-dom";
import Channels from "../pages/Channels";

export default function Layout() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: 250, borderRight: "1px solid #ddd", padding: 10 }}>
        <Channels />
      </div>
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
}
