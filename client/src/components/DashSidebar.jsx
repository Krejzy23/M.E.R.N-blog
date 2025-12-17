import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
} from "react-icons/hi";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setTab(params.get("tab") || "dash");
  }, [location.search]);

  const handleSignout = async () => {
    try {
      await fetch("/api/user/signout", { method: "POST" });
      dispatch(signoutSuccess());
    } catch (err) {
      console.error(err);
    }
  };

  const Item = ({ to, icon: Icon, label, active }) => (
    <Link to={to}>
      <div
        className={`
          flex items-center gap-3 px-4 py-2
          font-mono text-sm
          border-l-2
          transition
          ${
            active
              ? "border-green-400 text-green-400 bg-green-400/5"
              : "border-transparent text-cyan-400 hover:text-green-400 hover:bg-cyan-500/5"
          }
        `}
      >
        <Icon className="text-lg" />
        <span>{label}</span>
        {active && <span className="ml-auto text-green-400">&gt;</span>}
      </div>
    </Link>
  );

  return (
    <aside
      className="
        w-full md:w-52
        bg-black/80 backdrop-blur
        border-r border-cyan-500/30
        min-h-screen mt-20
      "
    >
      <div className="px-4 py-4 border-b border-cyan-500/20">
        <p className="text-xs font-mono text-cyan-400">
          ak@dashboard:~$
        </p>
      </div>

      <div className="flex flex-col gap-1 mt-2">
        {currentUser?.isAdmin && (
          <Item
            to="/dashboard?tab=dash"
            icon={HiChartPie}
            label="dashboard"
            active={tab === "dash"}
          />
        )}

        <Item
          to="/dashboard?tab=profile"
          icon={HiUser}
          label="profile"
          active={tab === "profile"}
        />

        {currentUser?.isAdmin && (
          <>
            <Item
              to="/dashboard?tab=posts"
              icon={HiDocumentText}
              label="posts"
              active={tab === "posts"}
            />
            <Item
              to="/dashboard?tab=users"
              icon={HiOutlineUserGroup}
              label="users"
              active={tab === "users"}
            />
            <Item
              to="/dashboard?tab=comments"
              icon={HiAnnotation}
              label="comments"
              active={tab === "comments"}
            />
          </>
        )}

        <div className="mt-4 border-t border-cyan-500/20 pt-2">
          <button
            onClick={handleSignout}
            className="
              w-full flex items-center gap-3 px-4 py-2
              font-mono text-sm
              text-red-400
              hover:bg-red-500/10
              transition
            "
          >
            <HiArrowSmRight className="text-lg" />
            sign out
          </button>
        </div>
      </div>
    </aside>
  );
}
