import { Outlet } from "react-router-dom";

import {
  BadgeDollarSign,
  BarChart,
  CircleUser,
  LayoutDashboard,
  LocateFixed,
  PackageSearch,
} from "lucide-react";

import { Header } from "@/components/header";
import { NavLink } from "@/components/nav-links";

const routes = [
  {
    to: "/",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    to: "/analytics",
    icon: BarChart,
    label: "Analytics",
  },
  {
    to: "/categories",
    icon: LocateFixed,
    label: "Categorias",
  },
  {
    to: "/products",
    icon: PackageSearch,
    label: "Produtos",
  },
  {
    to: "/orders",
    icon: BadgeDollarSign,
    label: "Pedidos",
  },
  {
    to: "/clients",
    icon: CircleUser,
    label: "Clientes",
  },
];

export function AppLayout() {
  return (
    <div className="antialiased">
      <Header />
      <div className="flex min-h-screen">
        <aside className="bg-white w-[240px]">
          <nav>
            <ul>
              {routes.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  icon={<item.icon className="size-4" />}
                  label={item.label}
                />
              ))}
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-8 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
