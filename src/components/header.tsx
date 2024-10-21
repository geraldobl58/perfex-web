import { Link } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export function Header() {
  return (
    <header className="flex items-center justify-between bg-white p-4">
      <Link to="/">
        <img
          width={100}
          src="/logo.svg"
          alt="Logo localizado acima do lado esquerdo"
        />
      </Link>
      <div>
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            className="size-10 rounded-full"
          />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
