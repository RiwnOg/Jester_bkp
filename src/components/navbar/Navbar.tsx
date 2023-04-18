import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

const Navbar: React.FC = ({}) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const user = useUser();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <>
      <div className="border-b-2 border-b-purple-700 p-2">
        <div className=" flex items-center justify-between">
          <h1 className="text-red-700 underline">Jester</h1>

          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>

          <div className="">
            {user.isSignedIn ? (
              <>
                <p>Hello, {user.user.firstName} 👋</p>
                <SignOutButton>Sign Out</SignOutButton>
              </>
            ) : (
              <SignInButton>Sign In</SignInButton>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
