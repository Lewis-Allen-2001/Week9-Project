import Link from "next/link"

export default function PageNotFound(){
    return(
        <div className="flex flex-col items-center justify-center h-screen text-center p-4">
            <h1 className="text-3xl font-bold mb-6">UH OH... The page you are trying to visit doesn&apos;t exist yet!</h1>
            <Link href={"/"} className="text-green-700 hover:text-green-600 font-medium underline">Please click here to return to FriendFace!</Link>
        </div>
    )
}