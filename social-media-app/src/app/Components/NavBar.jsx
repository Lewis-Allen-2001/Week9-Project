"use client";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-green-700 p-4 text-white">
      <div className="flex justify-center space-x-4">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/Posts" className="hover:underline">
          Post Feed
        </Link>
        <Link href="/Profile" className="hover:underline">
          Profile
        </Link>
      </div>
    </nav>
  );
}