import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import NavBar from "@/app/Components/NavBar"
import "./globals.css";

export const metadata = {
  title: "FriendFace",
  description: "Connect with your friends, one awkward moment at a time!",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton  />
        </SignedIn>
      <header className="w-full text-center py-4 bg-green-700 text-white text-2xl font-bold " >
        <a href="https://www.youtube.com/watch?v=j4o2PDwKdcA" >FRIENDFACE</a>
      </header>
        <NavBar/>
        {children}
        <footer className="w-full text-center py-5 bg-green-700 text-white text-2xl font-bold">© Lewis Allen 2024</footer>
      </body>
    </html>
  </ClerkProvider>
  );
}
