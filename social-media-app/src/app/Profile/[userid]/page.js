import { connect } from "@/app/utils/connect";
import { auth } from "@clerk/nextjs/server";

export default async function UserProfilePage({ params }) {
    const db = connect();
    const { userId } = auth();
    const result = await db.query('SELECT username, bio FROM profiles WHERE id = $1', [params.id]); 
    const postss = await db.query('SELECT * FROM postss WHERE content = $1', [params.id]);
    const User = result.rows[0];

    console.log(User, postss);


    return (
        <div>
            <h1>USER INFO:</h1>
            <h1>{User?.username}</h1>
            <h1>{User?.bio}</h1>
            <h2>USER POSTS:</h2>
            {postss.rows.map((post) => (
                <div key={post.id}>
                    <p>{post.content}</p>
                </div>
            ))}
        </div>
    );
}    

