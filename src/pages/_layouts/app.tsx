import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div>
      <div>
        <div>Header</div>
        <Outlet />
      </div>
    </div>
  );
}
