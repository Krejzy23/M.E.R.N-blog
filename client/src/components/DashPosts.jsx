import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) setShowMore(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) fetchPosts();
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) setShowMore(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        { method: 'DELETE' }
      );
      if (res.ok) {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='font-mono bg-black text-green-400 border border-green-700 rounded-md p-4 overflow-x-auto md:mt-20'>
      <h2 className='text-lg mb-4 text-green-500'>
        $ ls ./posts
      </h2>

      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table className='bg-black text-green-400'>
            <Table.Head className='bg-black border-b border-green-700'>
              <Table.HeadCell className='text-green-500'>UPDATED</Table.HeadCell>
              <Table.HeadCell className='text-green-500'>IMAGE</Table.HeadCell>
              <Table.HeadCell className='text-green-500'>TITLE</Table.HeadCell>
              <Table.HeadCell className='text-green-500'>CATEGORY</Table.HeadCell>
              <Table.HeadCell className='text-red-400'>DEL</Table.HeadCell>
              <Table.HeadCell className='text-cyan-400'>EDIT</Table.HeadCell>
            </Table.Head>

            <Table.Body className='divide-y divide-green-900'>
              {userPosts.map((post) => (
                <Table.Row
                  key={post._id}
                  className='bg-black hover:bg-green-950 transition'
                >
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>

                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className='w-24 h-12 object-cover border border-green-700'
                      />
                    </Link>
                  </Table.Cell>

                  <Table.Cell>
                    <Link
                      to={`/post/${post.slug}`}
                      className='hover:text-green-300'
                    >
                      {post.title}
                    </Link>
                  </Table.Cell>

                  <Table.Cell className='uppercase text-green-300'>
                    {post.category}
                  </Table.Cell>

                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setPostIdToDelete(post._id);
                      }}
                      className='cursor-pointer text-red-500 hover:text-red-400'
                    >
                      rm
                    </span>
                  </Table.Cell>

                  <Table.Cell>
                    <Link
                      to={`/update-post/${post._id}`}
                      className='text-cyan-400 hover:text-cyan-300'
                    >
                      nano
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

          {showMore && (
            <button
              onClick={handleShowMore}
              className='mt-4 text-green-500 hover:text-green-300'
            >
              $ show --more
            </button>
          )}
        </>
      ) : (
        <p className='text-green-600'>$ no posts found</p>
      )}

      {/* DELETE MODAL */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Body className='bg-black border border-green-700 rounded-md'>
          <div className='text-center font-mono'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-red-500 mx-auto mb-4' />
            <h3 className='mb-5 text-green-400'>
              $ rm post --force ?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button
                color='failure'
                onClick={handleDeletePost}
              >
                yes
              </Button>
              <Button
                color='gray'
                onClick={() => setShowModal(false)}
              >
                cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
