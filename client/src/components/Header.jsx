import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaMoon, FaSun, FaBars } from "react-icons/fa";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";
import { useState } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);

  const handleSignout = async () => {
    try {
      await fetch("/api/user/signout", { method: "POST" });
      dispatch(signoutSuccess());
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/search?searchTerm=${searchTerm}`);
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-green-400"
      : "text-cyan-500 hover:text-green-400";

  return (
    <header className="fixed top-0 left-0 w-full z-50 ">
      <div
        className="
          max-w-7xl mx-auto mt-2 px-6 py-3
          flex items-center justify-between
          bg-black/80 backdrop-blur
          border border-cyan-500/20
          font-mono
        "
      >
        {/* LOGO */}
        <Link to="/" className="text-green-400 text-lg tracking-widest">
          root@AK_lab:~$
        </Link>

        {/* NAV */}
        <nav className="hidden md:flex gap-6 text-md">
          <Link to="/" className={isActive("/")}>
            home
          </Link>
          <Link to="/projects" className={isActive("/projects")}>
            projects
          </Link>
          <Link to="/about" className={isActive("/about")}>
            about
          </Link>
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {/* MOBILE NAV MENU */}
          {open && (
            <div className="absolute top-full right-6 mt-2 w-56 bg-black/95 backdrop-blur border border-cyan-500/30 font-mono text-sm md:hidden z-50">
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="block px-4 py-3 hover:bg-cyan-500/10 text-cyan-500"
              >
                home
              </Link>

              <Link
                to="/projects"
                onClick={() => setOpen(false)}
                className="block px-4 py-3 hover:bg-cyan-500/10 text-cyan-500"
              >
                projects
              </Link>

              <Link
                to="/about"
                onClick={() => setOpen(false)}
                className="block px-4 py-3 hover:bg-cyan-500/10 text-cyan-500"
              >
                about
              </Link>

              <div className="border-t border-cyan-500/20 my-1" />

              {currentUser ? (
                <>
                  <Link
                    to="/dashboard?tab=profile"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 text-green-400 hover:bg-green-500/10"
                  >
                    profile
                  </Link>

                  <button
                    onClick={() => {
                      handleSignout();
                      setOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10"
                  >
                    exit
                  </button>
                </>
              ) : (
                <Link
                  to="/sign-in"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 text-green-400 hover:bg-green-500/10"
                >
                  access
                </Link>
              )}
            </div>
          )}
          {/* SEARCH */}
          <form onSubmit={handleSearch} className="hidden lg:block">
            <input
              type="text"
              placeholder="search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="
                bg-black border border-cyan-500/30
                text-green-400 text-sm px-3 py-1
                focus:outline-none focus:border-green-400
                placeholder-cyan-500/50
              "
            />
          </form>

          {/* THEME TOGGLE */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className="text-cyan-500 hover:text-green-400 transition"
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>

          {/* AUTH */}
          <div className="hidden md:block">
            {currentUser ? (
              <div className="relative group">
                <img
                  src={currentUser.profilePicture}
                  alt="user"
                  className="
                  w-9 h-9 rounded-full border
                  border-cyan-500/40 cursor-pointer
                  hover:border-green-400 transition
                "
                  onMouseEnter={() => setOpen(true)}
                  onMouseLeave={() => setOpen(false)}
                />

                {/* DROPDOWN */}
                <div
                  className="
                  absolute right-0 mt-3 w-52
                  bg-black/90 backdrop-blur
                  border border-cyan-500/30
                  text-sm
                  opacity-0 scale-95
                  group-hover:opacity-100 group-hover:scale-100
                  pointer-events-none group-hover:pointer-events-auto
                  transition-all duration-200
                "
                >
                  <div className="px-4 py-3 border-b border-cyan-500/20">
                    <p className="text-green-400">@{currentUser.username}</p>
                    <p className="text-cyan-500 text-xs truncate">
                      {currentUser.email}
                    </p>
                  </div>

                  <Link
                    to="/dashboard?tab=profile"
                    className="block px-4 py-2 hover:bg-cyan-500/10"
                  >
                    profile
                  </Link>

                  <button
                    onClick={handleSignout}
                    className="
                    w-full text-left px-4 py-2
                    text-red-400 hover:bg-red-500/10
                  "
                  >
                    exit
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/sign-in"
                className="text-green-400 hover:text-green-300 text-sm"
              >
                access
              </Link>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-cyan-500 hover:text-green-400 transition"
          >
            <FaBars size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
