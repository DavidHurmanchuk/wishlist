import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useWishContext } from '../context/WishContext';
import WishFormModal from '../components/WishFormModal';

interface Wish {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  createdAt: string;
}

const WishPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { deleteWish, updateWish } = useWishContext();
  const [wish, setWish] = useState<Wish | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3001/wishes/${id}`)
      .then(res => res.json())
      .then(setWish);
  }, [id]);

  const handleDelete = async () => {
    if (!wish) return;
    try {
      await deleteWish(wish.id);
      navigate('/');
    } catch {
      alert('Failed to delete');
    }
  };

  const handleUpdate = async (data: {
    title: string;
    description: string;
    price: number;
    image: string;
  }) => {
    if (!wish) return;
    try {
      await updateWish(wish.id, data);
      setWish({ ...wish, ...data });
      setShowEditModal(false);
    } catch {
      alert('Failed to update');
    }
  };

  if (!wish) {
    return (
      <div className="p-6 text-center text-gray-500 text-lg">
        Loading wish details...
      </div>
    );
  }

  const formattedDate = new Date(wish.createdAt).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button
        onClick={() => navigate('/')}
        className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
      >
        ← Back to Dashboard
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <img
          src={wish.image}
          alt={wish.title}
          className="w-full h-64 object-cover"
        />

        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{wish.title}</h1>
          <p className="text-gray-600 mb-4">{wish.description}</p>

          <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
            <span>Created: {formattedDate}</span>
            <span className="text-lg font-bold text-green-600">${wish.price}</span>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setShowEditModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
            >
              <FaEdit />
              Edit
            </button>

            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              <FaTrashAlt />
              Delete
            </button>
          </div>
        </div>
      </div>

      {showEditModal && (
        <WishFormModal
          onClose={() => setShowEditModal(false)}
          onSubmit={handleUpdate}
          initialData={wish}
          isEdit
        />
      )}
    </div>
  );
};

export default WishPage;