import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashComments() {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          if (data.comments.length < 9) setShowMore(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) fetchComments();
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(
        `/api/comment/getcomments?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) setShowMore(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteComment = async () => {
    try {
      const res = await fetch(
        `/api/comment/deleteComment/${commentIdToDelete}`,
        { method: 'DELETE' }
      );
      if (res.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
        setShowModal(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='font-mono text-green-400 p-4 overflow-x-auto md:mt-20'>
      <h2 className='text-lg mb-4 text-green-400'>
        $ tail -f /var/log/comments.log
      </h2>

      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <Table className='bg-black/80 border border-cyan-500/30 text-green-400'>
            <Table.Head className='bg-black/80 border-b border-cyan-500/30'>
              <Table.HeadCell className='text-cyan-500 border-r-1 border-cyan-500/30 bg-black/80'>
                UPDATED
              </Table.HeadCell>
              <Table.HeadCell className='text-cyan-500 border-r-1 border-cyan-500/30 bg-black/80'>
                CONTENT
              </Table.HeadCell>
              <Table.HeadCell className='text-cyan-400 border-r-1 border-cyan-500/30 bg-black/80'>
                LIKES
              </Table.HeadCell>
              <Table.HeadCell className='text-cyan-500 border-r-1 border-cyan-500/30 bg-black/80'>
                POST_ID
              </Table.HeadCell>
              <Table.HeadCell className='text-cyan-500 border-r-1 border-cyan-500/30 bg-black/80'>
                USER_ID
              </Table.HeadCell>
              <Table.HeadCell className='text-red-400 bg-black/80'>
                RM
              </Table.HeadCell>
            </Table.Head>

            <Table.Body className='divide-y divide-cyan-500/30'>
              {comments.map((comment) => (
                <Table.Row
                  key={comment._id}
                  className='bg-black hover:bg-green-950 transition'
                >
                  <Table.Cell>
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </Table.Cell>

                  <Table.Cell className='max-w-md truncate text-green-300'>
                    {comment.content}
                  </Table.Cell>

                  <Table.Cell className='text-cyan-400'>
                    {comment.numberOfLikes}
                  </Table.Cell>

                  <Table.Cell className='text-green-500 text-xs'>
                    {comment.postId}
                  </Table.Cell>

                  <Table.Cell className='text-green-500 text-xs'>
                    {comment.userId}
                  </Table.Cell>

                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setCommentIdToDelete(comment._id);
                      }}
                      className='cursor-pointer text-red-500 hover:text-red-400'
                    >
                      rm
                    </span>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

          {showMore && (
            <button
              onClick={handleShowMore}
              className='mt-4 text-cyan-500 hover:text-cyan-300'
            >
              $ show --more
            </button>
          )}
        </>
      ) : (
        <p className='text-green-600'>$ no comments found</p>
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
              $ rm comment --force ?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteComment}>
                yes
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
