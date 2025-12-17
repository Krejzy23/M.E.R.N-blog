import moment from "moment";
import { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Comment({ comment, onLike, onEdit, onDelete }) {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState(null);
  const [typedText, setTypedText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch(`/api/user/${comment.userId}`);
      const data = await res.json();
      if (res.ok) setUser(data);
    };
    getUser();
  }, [comment.userId]);

  // typing effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(comment.content.slice(0, i));
      i++;
      if (i > comment.content.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 18);

    return () => clearInterval(interval);
  }, [comment.content]);

  if (!user) return null;

  return (
    <div className="font-mono text-sm text-green-400 pl-4 border-l border-cyan-500/20">
      <div className="text-cyan-400/70 text-xs mb-1">
        [{moment(comment.createdAt).format("HH:mm:ss")}] user@{user.username}
      </div>

      <div className="flex">
        <span className="mr-2">&gt;</span>
        <span>
          {typedText}
          {!done && <span className="animate-pulse">▌</span>}
        </span>
      </div>

      {done && (
        <div className="mt-2 flex items-center gap-4 text-xs text-cyan-400/60">
          <button
            onClick={() => onLike(comment._id)}
            className={`flex items-center gap-1 hover:text-green-400 transition ${
              currentUser &&
              comment.likes.includes(currentUser._id) &&
              "text-green-400"
            }`}
          >
            <FaThumbsUp /> {comment.numberOfLikes || 0}
          </button>

          {currentUser &&
            (currentUser._id === comment.userId || currentUser.isAdmin) && (
              <>
                <button
                  onClick={() => onEdit(comment, comment.content)}
                  className="hover:text-yellow-400"
                >
                  EDIT
                </button>
                <button
                  onClick={() => onDelete(comment._id)}
                  className="hover:text-red-400"
                >
                  DEL
                </button>
              </>
            )}
        </div>
      )}
    </div>
  );
}
