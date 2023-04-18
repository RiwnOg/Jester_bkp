import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";

const Navbar: React.FC = ({}) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

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

          <div>
            <AuthShowcase />
          </div>
        </div>
      </div>
    </>
  );
};

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl ">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full  bg-slate-200 px-10 py-3  font-semibold no-underline transition hover:bg-slate-600/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

export default Navbar;
