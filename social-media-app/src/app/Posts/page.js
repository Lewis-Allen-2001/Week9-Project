import { connect } from "@/app/utils/connect";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link"

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
  }


  return (
    <div>
      <h3>Whats on your mind?</h3>
      <form action={handleCreatePost}>
        <textarea name="content" placeholder="New Post"></textarea>
        <button>Submit</button>
      </form>

      <h3>POST FEED</h3>
      {postss.rows.map((post) => {
        return (
          <div key={post.id}>
           <Link href={'Profile/${user.id}'}>{post.username} Said:</Link>
            <p>{post.content}</p>
          </div>
        );
      })}
    </div>
  );
}