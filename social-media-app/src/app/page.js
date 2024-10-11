'use client';
import Link from "next/link"
import DarkModeToggle from './Components/DarkModeToggle';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <DarkModeToggle/>
      <h1 className="text-4xl font-bold mb-6 text-green-700">Welcome To FriendFace</h1>
      <h2 className=" text-green-700 font-bold">Please click <Link href={"/Profile"} className=" text-green-700 hover:underline font-extrabold">HERE</Link> to set a username and bio to start posting! </h2>
      <div className="w-full max-w-sm">
      </div>
    </div>
  );
}