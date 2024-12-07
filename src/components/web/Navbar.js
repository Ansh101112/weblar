"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const session = localStorage.getItem("token");
    if (session) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    alert("You have logged out successfully!");
    router.push("/login");
  };

  const toggleMobileMenu = () => {
    const mobileMenu = document.getElementById("mobileMenu");
    mobileMenu.classList.toggle("hidden");
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/">
          <p className="text-2xl font-bold">Weblar</p>
        </Link>
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link href="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:text-gray-300">
              About
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:text-gray-300">
              Services
            </Link>
          </li>
          <li>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="block hover:text-gray-300"
              >
                Logout
              </button>
            ) : (
              <Link href="/login" className="block hover:text-gray-300">
                Login
              </Link>
            )}
          </li>
        </ul>
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMobileMenu}
          >
            ☰
          </button>
        </div>
      </div>
      <div
        id="mobileMenu"
        className="hidden md:hidden bg-gray-700 py-2 px-4 space-y-2"
      >
        <Link href="/" className="block hover:text-gray-300">
          Home
        </Link>
        <Link href="#" className="block hover:text-gray-300">
          About
        </Link>
        <Link href="#" className="block hover:text-gray-300">
          Services
        </Link>
        {isLoggedIn ? (
          <button onClick={handleLogout} className="block hover:text-gray-300">
            Logout
          </button>
        ) : (
          <Link href="/login" className="block hover:text-gray-300">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
