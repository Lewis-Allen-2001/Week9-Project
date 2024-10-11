import { connect } from "@/app/utils/connect";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation"

export default function ProfilePage() {
  const { userId } = auth();

  async function handleUpdateProfile(formData) {
    "use server";
    const db = connect();

    const username = formData.get("username");
    const bio = formData.get("bio");

    const profiles = await db.query(
      `SELECT * FROM profiles WHERE clerk_id = $1`,
      [userId]
    );
    if (profiles.rowCount === 0) {
      await db.query(
        `INSERT INTO profiles (clerk_id, username, bio) VALUES ($1, $2, $3)`,
        [userId, username, bio]
      );
    } else {
      await db.query(
        `UPDATE profiles SET username=$1, bio=$2 WHERE clerk_id=$3`,
        [username, bio, userId]
      );
    }
    redirect("/Posts")
  }


  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Profile Page</h2>
      <h3 className="text-lg text-center mb-6">Please update your profile so you can start posting!</h3>
      <h4 className="text-lg text-center mb-6">You can change these at any time!</h4>

      <div className="flex justify-center">
        <form action={handleUpdateProfile} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <input name="username" placeholder="Username" className="w-full p-2 border border-green-700 rounded-md focus:outline-none focus:border-green-700"/>
          </div>

          <div className="mb-4">
            <textarea name="bio" placeholder="Bio" className="w-full p-2 border border-green-700 rounded-md focus:outline-none focus:border-green-700 resize-none"/>                
          </div>

          <button type="submit" className="w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-600" >Submit</button>
        </form>
      </div>
    </div>
  );
}
