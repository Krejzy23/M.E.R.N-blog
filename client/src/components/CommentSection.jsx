import { Alert, Button, Modal, TextInput, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Comment from "./Comment";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment("");
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: "PUT",
      });
      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };

  const handleDelete = async (commentId) => {
    setShowModal(false);
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const data = await res.json();
        setComments(comments.filter((comment) => comment._id !== commentId));
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-2 font-mono text-sm text-cyan-400 my-5">
          <span>&gt;</span>
          <img
            className="h-5 w-5 rounded-full border border-cyan-500/40"
            src={currentUser.profilePicture}
            alt=""
          />
          <Link
            to="/dashboard?tab=profile"
            className="hover:text-green-400 transition"
          >
            user@{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          You must be signed in to comment.
          <Link className="text-blue-500 hover:underline" to={"/sign-in"}>
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border border-teal-500 rounded-md p-3"
        >
          <Textarea
            placeholder="> write_message --max 200"
            rows="5"
            maxLength="200"
            className="bg-black/80 text-green-400 font-mono border border-cyan-500/30 focus:ring-0 focus:border-green-400"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            style={{
              background: "#0b0f19",
              color: "#22c55e",        // text
              border: "1px solid #00ffff", // barva a tloušťka borderu
              borderRadius: "0px",     // hranaté rohy
              padding: "0.5 rem 0.5rem", // vnitřní odsazení
            }}
          />
          <div className="flex justify-between items-center mt-5">
            <p className="font-mono text-cyan-400/60 text-xs">
              {200 - comment.length} char left
            </p>
            <Button
              type="submit"
              className="font-mono border border-green-400 text-green-400 bg-black hover:bg-green-400/10"
            >
              EXECUTE
            </Button>
          </div>
          {commentError && (
            <p className="mt-4 font-mono text-red-400 text-sm">
              ERROR :: {commentError}
            </p>
          )}
        </form>
      )}
      {comments.length === 0 ? (
        <p className="mt-6 font-mono text-cyan-400/60">
          &gt; no_log_entries_found
        </p>
      ) : (
        <>
          <div className="mt-8 border-l border-cyan-500/30 pl-4 mb-4">
            <h3 className="font-mono text-green-400 text-lg">
              #user_input{" "}
              <span className="text-cyan-400/70 text-sm">
                ({comments.length})
              </span>
            </h3>
          </div>
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={(commentId) => {
                setShowModal(true);
                setCommentToDelete(commentId);
              }}
            />
          ))}
        </>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <div className="bg-black border border-cyan-400/70">
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-red-400 dark:text-gray-200 mb-4 mx-auto" />
              <h3 className="mb-5 text-lg font-mono text-red-400">
                SYSTEM WARNING
              </h3>
              <p className="text-sm text-cyan-400/70 pb-5">
                This action will permanently remove the log entry.
              </p>

              <div className="flex justify-center gap-4">
                <Button
                  color="failure"
                  onClick={() => handleDelete(commentToDelete)}
                >
                  DELETE
                </Button>
                <Button color="gray" onClick={() => setShowModal(false)}>
                  ABORT
                </Button>
              </div>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </div>
  );
}
