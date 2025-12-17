import { Alert, Button, Modal } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from "../redux/user/userSlice";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function DashProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [success, setSuccess] = useState(null);
  const [fail, setFail] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fileRef = useRef();

  useEffect(() => {
    if (imageFile) uploadImage();
  }, [imageFile]);

  const uploadImage = () => {
    setUploadError(null);
    const storage = getStorage(app);
    const fileName = Date.now() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snap) => {
        const progress = (snap.bytesTransferred / snap.totalBytes) * 100;
        setUploadProgress(progress.toFixed(0));
      },
      () => {
        setUploadError("Image upload failed (max 2MB)");
        setUploadProgress(null);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setImageFileUrl(url);
        setFormData((prev) => ({ ...prev, profilePicture: url }));
        setUploadProgress(null);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFail(null);
    setSuccess(null);

    if (!Object.keys(formData).length) {
      setFail("No changes detected");
      return;
    }

    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setFail(data.message);
      } else {
        dispatch(updateSuccess(data));
        setSuccess("Profile updated successfully");
      }
    } catch (err) {
      dispatch(updateFailure(err.message));
      setFail(err.message);
    }
  };

  const handleDelete = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      await fetch(`/api/user/delete/${currentUser._id}`, { method: "DELETE" });
      dispatch(deleteUserSuccess());
    } catch (err) {
      dispatch(deleteUserFailure(err.message));
    }
  };

  const handleSignout = async () => {
    await fetch("/api/user/signout", { method: "POST" });
    dispatch(signoutSuccess());
  };

  return (
    <section className="flex-1 p-6 md:mt-20">
      {/* HEADER */}
      <div className="mb-6 px-6 font-mono text-cyan-400 text-sm">
        ak@dashboard:~$ <span className="text-green-400">profile</span>
      </div>

      <div className="max-w-xl mx-auto bg-black/70 border border-cyan-500/30 p-6 font-mono">
        {/* AVATAR */}
        <input
          type="file"
          hidden
          ref={fileRef}
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />

        <div
          onClick={() => fileRef.current.click()}
          className="relative w-32 h-32 mx-auto cursor-pointer"
        >
          {uploadProgress && (
            <CircularProgressbar
              value={uploadProgress}
              text={`${uploadProgress}%`}
              styles={{
                path: { stroke: "#22d3ee" },
                text: { fill: "#22d3ee", fontSize: "24px" },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="avatar"
            className="absolute inset-0 w-full h-full rounded-full object-cover border border-cyan-500/40"
          />
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {["username", "email", "password"].map((field) => (
            <input
              key={field}
              id={field}
              type={field === "password" ? "password" : "text"}
              placeholder={field}
              defaultValue={currentUser[field]}
              onChange={(e) =>
                setFormData({ ...formData, [field]: e.target.value })
              }
              className="
                w-full bg-black border border-cyan-500/30
                px-3 py-2 text-green-400
                focus:outline-none focus:border-green-400
              "
            />
          ))}

          <button
            disabled={loading}
            className="
              w-full border border-green-400
              text-green-400 py-2
              hover:bg-green-400/10 transition
            "
          >
            {loading ? "updating..." : "> update profile"}
          </button>

          {currentUser.isAdmin && (
            <Link
              to="/create-post"
              className="block text-center border border-cyan-500/30 py-2 text-cyan-400 hover:text-green-400"
            >
              + create post
            </Link>
          )}
        </form>

        {/* ACTIONS */}
        <div className="flex justify-between mt-6 text-xs">
          <button
            onClick={() => setShowModal(true)}
            className="text-red-400 hover:underline"
          >
            delete account
          </button>
          <button
            onClick={handleSignout}
            className="text-cyan-400 hover:text-green-400"
          >
            sign out
          </button>
        </div>

        {success && <Alert color="success" className="mt-4">{success}</Alert>}
        {fail && <Alert color="failure" className="mt-4">{fail}</Alert>}
        {error && <Alert color="failure" className="mt-4">{error}</Alert>}
      </div>

      {/* MODAL */}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup>
        <Modal.Body className="bg-black text-center">
          <HiOutlineExclamationCircle className="mx-auto text-red-400 w-12 h-12 mb-4" />
          <p className="text-cyan-400 mb-4">
            Are you sure you want to delete this account?
          </p>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={handleDelete}>
              yes
            </Button>
            <Button color="gray" onClick={() => setShowModal(false)}>
              cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </section>
  );
}
