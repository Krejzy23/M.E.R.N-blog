import { Button, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import SearchCommandPreview from "../components/SearchCommandPreview";

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });

  console.log(sidebarData);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData((prev) => ({
        ...prev,
        searchTerm: searchTermFromUrl || "",
        sort: sortFromUrl || "desc",
        category: categoryFromUrl || "uncategorized",
      }));
    }

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/post/getposts?${searchQuery}`);
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data.posts);
        setShowMore(data.posts.length === 9);
      } catch (error) {
        console.log(error); // Log the error
        setError(true); // Optionally set an error state to show an error message
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === "category") {
      const category = e.target.value || "uncategorized";
      setSidebarData({ ...sidebarData, category });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm || "");
    urlParams.set("sort", sidebarData.sort || "desc");
    urlParams.set("category", sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  return (
    <div className="flex pt-16 flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-cyan-500/20 font-mono">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="text-cyan-400 text-xs block mb-1">
              --searchTerm
            </label>
            <TextInput
              id="searchTerm"
              value={sidebarData.searchTerm}
              onChange={handleChange}
              placeholder="type keyword"
              className=" text-green-400 border-cyan-500/30"
              style={{
                background: "#0b0f19",
                color: "#22c55e",        // text
                border: "1px solid #00ffff", // barva a tloušťka borderu
                borderRadius: "0px",     // hranaté rohy
                padding: "0.5 rem 0.5rem", // vnitřní odsazení
              }}
            />
          </div>

          <div>
            <label className="text-cyan-400 text-xs block mb-1">--sort</label>
            <Select
              id="sort"
              value={sidebarData.sort}
              onChange={handleChange}
              className="bg-black text-green-400 border-cyan-500/30"
              style={{
                background: "#0b0f19",
                color: "#22c55e",        // text
                border: "1px solid #00ffff", // barva a tloušťka borderu
                borderRadius: "0px",     // hranaté rohy
                padding: "0.5 rem 0.5rem", // vnitřní odsazení
              }}
            >
              <option value="desc">latest</option>
              <option value="asc">oldest</option>
            </Select>
          </div>

          <div>
            <label className="text-cyan-400 text-xs block mb-1">
              --category
            </label>
            <Select
              id="category"
              value={sidebarData.category}
              onChange={handleChange}
              style={{
                background: "#0b0f19",
                color: "#22c55e",        // text
                border: "1px solid #00ffff", // barva a tloušťka borderu
                borderRadius: "0px",     // hranaté rohy
                padding: "0.5 rem 0.5rem", // vnitřní odsazení
              }}
            >
              <option value="uncategorized">any</option>
              <option value="Coding">Coding</option>
              <option value="Ai">AI</option>
              <option value="Crypto">Crypto</option>
              {/* zbytek */}
            </Select>
          </div>

          <Button
            type="submit"
            className="font-mono border border-green-400 text-green-400 bg-black hover:bg-green-400/10"
          >
            EXECUTE
          </Button>
        </form>
      </div>

      <div className="w-full">
        <h1 className="font-mono text-green-400 text-2xl p-3 mt-2 border-b border-cyan-500/20">
          #search_results
        </h1>
        <div className="px-7 pt-3">
          <SearchCommandPreview total={posts.length} />
        </div>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && posts.length === 0 && (
            <p className="text-xl text-gray-500">No posts found.</p>
          )}
          {loading && <p className="text-xl text-gray-500">fetching data...</p>}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
          {showMore && (
            <button
              onClick={handleShowMore}
              className="text-stroke-1 text-lg hover:underline p-7 w-full"
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
