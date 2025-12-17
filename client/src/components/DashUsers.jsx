import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) setShowMore(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) fetchUsers();
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) setShowMore(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setUsers((prev) =>
          prev.filter((user) => user._id !== userIdToDelete)
        );
        setShowModal(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='font-mono bg-black text-green-400 border border-green-700 rounded-md p-4 overflow-x-auto mt-20'>
      <h2 className='text-lg mb-4 text-green-500'>
        $ cat /etc/users
      </h2>

      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table className='bg-black text-green-400'>
            <Table.Head className='bg-black border-b border-green-700'>
              <Table.HeadCell className='text-green-500'>CREATED</Table.HeadCell>
              <Table.HeadCell className='text-green-500'>AVATAR</Table.HeadCell>
              <Table.HeadCell className='text-green-500'>USERNAME</Table.HeadCell>
              <Table.HeadCell className='text-green-500'>EMAIL</Table.HeadCell>
              <Table.HeadCell className='text-cyan-400'>ADMIN</Table.HeadCell>
              <Table.HeadCell className='text-red-400'>DEL</Table.HeadCell>
            </Table.Head>

            <Table.Body className='divide-y divide-green-900'>
              {users.map((user) => (
                <Table.Row
                  key={user._id}
                  className='bg-black hover:bg-green-950 transition'
                >
                  <Table.Cell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </Table.Cell>

                  <Table.Cell>
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      className='w-10 h-10 object-cover border border-green-700'
                    />
                  </Table.Cell>

                  <Table.Cell className='text-green-300'>
                    {user.username}
                  </Table.Cell>

                  <Table.Cell className='text-green-400'>
                    {user.email}
                  </Table.Cell>

                  <Table.Cell>
                    {user.isAdmin ? (
                      <FaCheck className='text-green-500' />
                    ) : (
                      <FaTimes className='text-red-500' />
                    )}
                  </Table.Cell>

                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user._id);
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
              className='mt-4 text-green-500 hover:text-green-300'
            >
              $ show --more
            </button>
          )}
        </>
      ) : (
        <p className='text-green-600'>$ no users found</p>
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
              $ rm user --force ?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteUser}>
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
