import { connect } from "@/app/utils/connect";
import { auth } from "@clerk/nextjs/server";


export default async function UserProfilePage() {
    const db = connect();
    const { userId } = auth();
    
   const userInfo = await db.query(`
     SELECT
        postss.id,
        profiles.username,
        profiles.bio,
        postss.content
    FROM postss
    INNER JOIN profiles ON postss.clerk_id = profiles.clerk_id
    WHERE profiles.clerk_id = $1 ;`, [ userId ])
   
    const user = userInfo.rows[0];
    const posts = userInfo.rows;


    console.log(user)

// add where to current query
// make another varible for user and post 
//assign userInfo.rows[0]
//posts userInfo.rows

    return (
        <div>
            <h1>{user.username}&apos;s Profile</h1>
            <h2>Bio: {user.bio}</h2>

            <h1>{user.username}&apos;s Posts: </h1>
              {posts.map(post => (
                <div key = {post.id}>
                    <h1>{post.content}</h1>
                    </div>
        ))} 
        </div>
    );
}    