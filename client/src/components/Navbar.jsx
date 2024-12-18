import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Image from "./Image";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation(); // Hook to get the current route

  // Helper function to determine if a link is active
  const isActive = (path, queryParam) => {
    const currentPath = location.pathname + location.search; // Combine pathname and search
    return currentPath === path + (queryParam || "");
  };

  return (
    <div
      className={`w-full h-16 md:h-20 flex items-center justify-between relative ${
        open ? "z-50" : ""
      }`}
    >
      {/* LOGO */}
      <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
        <Image src="Hyve.png" alt="Lama Logo" w={32} h={32} />
        <span>Hyve</span>
      </Link>
      {/* MOBILE MENU */}
      <div className="md:hidden">
        {/* MOBILE BUTTON */}
        <div
          className="cursor-pointer text-4xl"
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className="flex flex-col gap-[5.4px]">
            <div
              className={`h-[3px] rounded-md w-6 bg-black origin-left transition-all ease-in-out ${
                open && "rotate-45"
              }`}
            ></div>
            <div
              className={`h-[3px] rounded-md w-6 bg-black transition-all ease-in-out ${
                open && "opacity-0"
              }`}
            ></div>
            <div
              className={`h-[3px] rounded-md w-6 bg-black origin-left transition-all ease-in-out ${
                open && "-rotate-45"
              }`}
            ></div>
          </div>
        </div>
        {/* MOBILE LINK LIST */}
        <div
          className={`w-full h-screen bg-body flex flex-col items-center justify-center gap-8 font-medium text-lg absolute top-16 transition-all ease-in-out ${
            open ? "-right-0" : "-right-[100%]"
          }`}
        >
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className={`${
              isActive("/") ? "bg-yellow-100 border-l-4 border-yellow-500 px-2 py-1 rounded text-hyve" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/posts?sort=trending"
            onClick={() => setOpen(false)}
            className={`${
              isActive("/posts", "?sort=trending")
                ? "bg-yellow-100 border-l-4 border-yellow-500 px-2 py-1 rounded text-hyve"
                : ""
            }`}
          >
            Trending
          </Link>
          <Link
            to="/posts?sort=popular"
            onClick={() => setOpen(false)}
            className={`${
              isActive("/posts", "?sort=popular")
                ? "bg-yellow-100 border-l-4 border-yellow-500 px-2 py-1 rounded text-hyve"
                : ""
            }`}
          >
            Most Popular
          </Link>
          <SignedOut>
            <Link
              to="/login"
              onClick={() => setOpen(false)}
            >
              <button className="py-2 px-4 rounded-3xl bg-hyve text-white">
                Login 👋
              </button>
            </Link>
          </SignedOut>
          <SignedIn>
            <Link
              to="/saved"
              onClick={() => setOpen(false)}
              className={`${
                isActive("/saved") ? "bg-yellow-100 border-l-4 border-yellow-500 px-2 py-1 rounded text-hyve" : ""
              }`}
            >
              Saved Posts
            </Link>
            <UserButton />
          </SignedIn>
        </div>
      </div>
      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <Link
          to="/"
          className={`${
            isActive("/") ? "bg-yellow-100 border-l-4 border-yellow-500 px-2 py-1 rounded text-hyve" : ""
          }`}
        >
          Home
        </Link>
        <Link
          to="/posts?sort=trending"
          className={`${
            isActive("/posts", "?sort=trending")
              ? "bg-yellow-100 border-l-4 border-yellow-500 px-2 py-1 rounded text-hyve"
              : ""
          }`}
        >
          Trending
        </Link>
        <Link
          to="/posts?sort=popular"
          className={`${
            isActive("/posts", "?sort=popular")
              ? "bg-yellow-100 border-l-4 border-yellow-500 px-2 py-1 rounded text-hyve"
              : ""
          }`}
        >
          Most Popular
        </Link>
        <SignedOut>
          <Link
            to="/login"
          >
            <button className="py-2 px-4 rounded-3xl bg-hyve text-white">
              Login 👋
            </button>
          </Link>
        </SignedOut>
        <SignedIn>
          <Link
            to="/saved"
            className={`${
              isActive("/saved") ? "bg-yellow-100 border-l-4 border-yellow-500 px-2 py-1 rounded text-hyve" : ""
            }`}
          >
            Saved Posts
          </Link>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
