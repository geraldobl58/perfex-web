import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

export function NavLink({ to, icon, label }: NavItemProps) {
  const { pathname } = useLocation();
  return (
    <li className="p-2 flex flex-col gap-2 space-y-2">
      <Link
        to={to}
        className={cn(
          `
          flex items-center gap-2 font-medium text-sm rounded-md text-gray-600 p-2
        `,
          pathname === to
            ? "bg-violet-600 text-white"
            : "hover:bg-violet-600 hover:text-white"
        )}
      >
        {icon}
        {label}
      </Link>
    </li>
  );
}
