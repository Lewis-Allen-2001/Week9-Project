import Link from "next/link";

export default function PageBroken() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <h1 className="text-3xl font-bold mb-4 text-grey">
        UH OH... The page you are trying to visit has broken!
      </h1>
      <h1 className="text-xl mb-6">
        Accidents happen, and we will fix this ASAP!
    </h1>
    <Link href="/" className="text-green-700 hover:text-green-600 font-medium underline">
          Please click here to return to FriendFace!
      </Link>
    </div>
  );
}
