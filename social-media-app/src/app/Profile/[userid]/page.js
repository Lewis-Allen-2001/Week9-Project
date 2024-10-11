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

// add WHERE to current query
// make another varible for user and post 
//assign userInfo.rows[0]
//posts userInfo.rows

    return (
        <div className="container mx-auto p-6">
        <div className="bg-slate-100 shadow-lg rounded-lg p-6">

            <h1 className="text-3xl font-bold mb-4 text-center">{user.username}&apos;s Profile</h1>
            <p className="text-gray-700 mb-4 text-center font-bold">Bio: {user.bio}</p>
        </div>

        <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-center">{user.username}&apos;s Posts:</h2>
            <div className="space-y-4 text-center">
                {posts.map(post => (
                    <div key={post.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                        <p className="text-gray-800">{post.content}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
);
}    