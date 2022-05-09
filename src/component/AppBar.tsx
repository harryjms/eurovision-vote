import { useAuth } from "../providers/AuthProvider";

const AppBar = () => {
  const { user } = useAuth();
  return (
    <nav className="p-2 bg-purple-400 text-white mb-2">
      <div className="container flex justify-between">
        <div className="uppercase">
          <b>Eurovision</b> You Decide
        </div>
        {user ? (
          <div>
            {user?.name}{" "}
            <a href="/api/logout" className="ml-2 text-sm">
              Logout
            </a>
          </div>
        ) : (
          <div>
            <a href="/login" className="ml-2 text-sm">
              Login
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AppBar;
