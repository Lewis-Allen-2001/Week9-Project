import { connect } from "@/app/utils/connect";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import PageNotFound from "@/app/Components/PageNotFound";
import {redirect} from "next/navigation"

export default async function PostssPage() {
  // get the user ID from clerk
  const { userId } = auth();

  const db = connect();
  const postss = await db.query(`
    SELECT
        postss.id,
        profiles.username,
        postss.content
    FROM postss
    INNER JOIN profiles ON postss.clerk_id = profiles.clerk_id;
  `);

  async function handleCreatePost(formData) {
    "use server";
    const db = connect();

    const content = formData.get("content");

    await db.query(`INSERT INTO postss (clerk_id, content) VALUES ($1, $2)`, [
      userId,
      content,
    ]);
    redirect;{"/Posts"}
  }

   if (!postss.username) {
     PageNotFound()
   }

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-xl font-bold mb-4 text-center">What&apos;s on your mind?</h3>
      
      <div className="flex justify-center mb-8">

        <form action={handleCreatePost} className="w-full max-w-lg">
          <textarea
            name="content"
            placeholder="New Post"
            className="w-full p-2 border border-green-700 rounded-md focus:outline-none focus:border-indigo-500 resize-none"/>


          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-600 w-full">
            Submit
          </button>


        </form>
      </div>

      <h3 className="text-lg font-semibold mb-4">POST FEED</h3>
      {postss.rows.map((post) => {
        return (
          <div key={post.id} className="mb-6 border-b border-green-700 pb-4">
            <Link href={`/Profile/${userId}`} className="text-green-700 font-medium hover:underline">
                {post.username} said:
            </Link>
            <p className="mt-2 text-gray-700">{post.content}</p>
          </div>
        );
      })}
    </div>
  );
}
