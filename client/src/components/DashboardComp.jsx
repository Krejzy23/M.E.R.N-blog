import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";

export default function DashboardComp() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/getusers?limit=5");
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getposts?limit=5");
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comment/getcomments?limit=3");
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);
  return (
    <div className="p-3 md:mx-auto md:mt-24">
      <div className="flex-wrap flex gap-4 justify-center">
        <div className="flex flex-col p-3 gap-4 md:w-72 w-full shadow-md font-mono font-semibold text-green-400 border border-cyan-500/30 bg-black/80 backdrop-blur">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-green-400 text-md uppercase">Total Users</h3>
              <p className="text-2xl">{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="bg-[#0b0f19] text-cyan-400 border border-sm border-cyan-500/30 text-7xl p-3 shadow-lg hover:text-green-400 hover:bg-cyan-500/10" />
          </div>
          <div className="flex  gap-2 text-sm">
            <span className="text-cyan-400 flex items-center">
              <HiArrowNarrowUp className="text-cyan-400" />
              {lastMonthUsers}
            </span>
            <div className="text-cyan-400">Last month</div>
          </div>
        </div>
        <div className="flex flex-col p-3 gap-4 md:w-72 w-full shadow-md font-mono font-semibold text-green-400 border border-cyan-500/30 bg-black/80 backdrop-blur">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-green-400 text-md uppercase">
                Total Comments
              </h3>
              <p className="text-2xl">{totalComments}</p>
            </div>
            <HiAnnotation className="bg-[#0b0f19] text-cyan-400 border border-sm border-cyan-500/30 text-7xl p-3 shadow-lg hover:text-green-400 hover:bg-cyan-500/10" />
          </div>
          <div className="flex  gap-2 text-sm">
            <span className="text-cyan-400 flex items-center">
              <HiArrowNarrowUp className="text-cyan-400" />
              {lastMonthComments}
            </span>
            <div className="text-cyan-400">Last month</div>
          </div>
        </div>
        <div className="flex flex-col p-3 gap-4 md:w-72 w-full shadow-md font-mono font-semibold text-green-400 border border-cyan-500/30 bg-black/80 backdrop-blur">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-green-400 text-md uppercase">Total Posts</h3>
              <p className="text-2xl">{totalPosts}</p>
            </div>
            <HiDocumentText className="bg-[#0b0f19] text-cyan-400 border border-sm border-cyan-500/30 text-7xl p-3 shadow-lg hover:text-green-400 hover:bg-cyan-500/10" />
          </div>
          <div className="flex  gap-2 text-sm">
            <span className="text-cyan-400 flex items-center">
              <HiArrowNarrowUp className="text-cyan-400" />
              {lastMonthPosts}
            </span>
            <div className="text-cyan-400">Last month</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
        <div className="flex flex-col w-full md:w-auto shadow-md p-5 font-mono font-semibold text-green-400 border border-cyan-500/30 bg-black/80 backdrop-blur">
          <div className="flex justify-between items-center p-3 text-sm font-semibold -mt-5">
            <h1 className="text-center text-base p-1">Recent users</h1>
            <button className="group relative flex items-center gap-2 px-4 py-2 border border-cyan-500/40 text-cyan-400 font-mono text-sm hover:text-green-300 hover:border-green-400 transition overflow-hidden">
              <span className="absolute inset-0 bg-green-400/40 blur-lg opacity-0 group-hover:opacity-100 transition" />
              <Link className="relative z-10" to={"/dashboard?tab=users"}>
                See all
              </Link>
            </button>
          </div>
          <Table
            style={{ border: "1px solid #06b6d44D" }}
            className="border-cyan-500/30 bg-[#0b0f19]"
          >
            <Table.Head>
              <Table.HeadCell className="bg-[#0b0f19] text-cyan-400 border-x border-b-1 border-cyan-500/30">
                User image
              </Table.HeadCell>
              <Table.HeadCell className="bg-[#0b0f19] text-cyan-400 border-b-1 border-cyan-500/30">
                Username
              </Table.HeadCell>
            </Table.Head>
            {users &&
              users.map((user) => (
                <Table.Body key={user._id} className="divide-y">
                  <Table.Row className="">
                    <Table.Cell>
                      <img
                        src={user.profilePicture}
                        alt="user"
                        className="w-10 h-10 bg-[#0b0f19]"
                      />
                    </Table.Cell>
                    <Table.Cell className="text-green-400">
                      {user.username}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
        <div className="flex flex-col w-full md:w-auto shadow-md p-5 font-mono font-semibold text-green-400 border border-cyan-500/30 bg-black/80 backdrop-blur">
          <div className="flex justify-between items-center -mt-5 p-3 text-sm font-semibold">
            <h1 className="text-center text-base p-1">Recent comments</h1>
            <button className="group relative flex items-center gap-2 px-4 py-2 border border-cyan-500/40 text-cyan-400 font-mono text-sm hover:text-green-300 hover:border-green-400 transition overflow-hidden">
              <span className="absolute inset-0 bg-green-400/40 blur-lg opacity-0 group-hover:opacity-100 transition" />
              <Link to={"/dashboard?tab=comments"}>See all</Link>
            </button>
          </div>
          <Table
            style={{ border: "1px solid #06b6d44D" }}
            className="border-cyan-500/30 border-md bg-[#0b0f19] custom-hover"
          >
            <Table.Head>
              <Table.HeadCell className="text-cyan-400 bg-[#0b0f19] border-r-1 border-cyan-500/30">Comment content</Table.HeadCell>
              <Table.HeadCell className="text-cyan-400 bg-[#0b0f19]">Likes</Table.HeadCell>
            </Table.Head>
            {comments &&
              comments.map((comment) => (
                <Table.Body key={comment._id} className="divide-y divide-cyan-500/30">
                  <Table.Row className="font-mono font-semibold text-green-400 border border-cyan-500/30 bg-[#0b0f19] backdrop-blur">
                    <Table.Cell className="w-96">
                      <p className="line-clamp-2">{comment.content}</p>
                    </Table.Cell>
                    <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
        <div className="flex flex-col w-full md:w-auto shadow-md p-5 md:p-10 font-mono font-semibold text-green-400 border border-cyan-500/30 bg-black/80 backdrop-blur">
          <div className="flex justify-between items-center -mt-5 md:-mt-10 p-3 text-sm font-semibold">
            <h1 className="text-center text-base p-1">Recent posts</h1>
            <button className="group relative flex items-center gap-2 px-4 py-2 border border-cyan-500/40 text-cyan-400 font-mono text-sm hover:text-green-300 hover:border-green-400 transition overflow-hidden">
              <span className="absolute inset-0 bg-green-400/40 blur-lg opacity-0 group-hover:opacity-100 transition" />
              <Link to={"/dashboard?tab=posts"}>See all</Link>
            </button>
          </div>
          <Table style={{ border: "1px solid #06b6d44D" }}
            className="border-cyan-500/30 border border-md bg-[#0b0f19] custom-hover">
            <Table.Head className="border-b">
              <Table.HeadCell className="text-cyan-400 bg-[#0b0f19] border-r-1 border-cyan-500/30">Post image</Table.HeadCell>
              <Table.HeadCell className="text-cyan-400 bg-[#0b0f19] border-r-1 border-cyan-500/30">Post Title</Table.HeadCell>
              <Table.HeadCell className="text-cyan-400 bg-[#0b0f19] border-r-1 border-cyan-500/30">Category</Table.HeadCell>
            </Table.Head>
            {posts &&
              posts.map((post) => (
                <Table.Body key={post._id} className="divide-y-1 divide-cyan-500">
                  <Table.Row className="font-mono font-semibold text-green-400 border border-cyan-500/30 bg-[#0b0f19] backdrop-blur">
                    <Table.Cell>
                      <img
                        src={post.image}
                        alt="user"
                        className="w-14 h-10 rounded-md bg-[#0b0f19]"
                      />
                    </Table.Cell>
                    <Table.Cell className="w-96">{post.title}</Table.Cell>
                    <Table.Cell className="w-5">{post.category}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
      </div>
    </div>
  );
}
