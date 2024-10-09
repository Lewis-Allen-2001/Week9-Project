import { connect } from "@/app/utils/connect"
import { auth } from "@clerk/nextjs/server";

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
  }

  return (
    <div>
      <h2>Profile Page</h2>
     <h3>Please update your profile so you can start posting!</h3>
      <form action={handleUpdateProfile}>
        <input name="username" placeholder="Username" />
        <textarea name="bio" placeholder="Bio"></textarea>
        <button>Submit</button>
      </form>
    </div>
  );
}