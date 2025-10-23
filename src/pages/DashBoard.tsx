import { useWishContext } from '../context/WishContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WishFormModal from '../components/WishFormModal';
import ConfirmModal from '../components/ConfirmModal';
import Snackbar from '../components/Snackbar';
import WishCard from '../components/WishCard';
import type { Wish } from '../context/WishContext';

const Dashboard = () => {
  const { wishes, addWish, updateWish, deleteWish } = useWishContext();
  const [showModal, setShowModal] = useState(false);
  const [editWish, setEditWish] = useState<Wish | null>(null);
  const [wishToDelete, setWishToDelete] = useState<Wish | null>(null);
  const [snackbar, setSnackbar] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const navigate = useNavigate();

  const [sortDate, setSortDate] = useState<'newest' | 'oldest'>('newest');
  const [sortPrice, setSortPrice] = useState<'high' | 'low'>('high');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const showSnackbar = (message: string, type: 'success' | 'error' = 'success') => {
    setSnackbar({ message, type });
    setTimeout(() => setSnackbar(null), 4000);
  };

  const handleUpdate = async (data: {
    title: string;
    description: string;
    price: number;
    image: string;
  }) => {
    if (editWish) {
      try {
        await updateWish(editWish.id, data);
        showSnackbar('Wish updated');
        setEditWish(null);
      } catch {
        showSnackbar('Failed to update wish', 'error');
      }
    }
  };

  const handleAdd = async (data: {
    title: string;
    description: string;
    price: number;
    image: string;
  }) => {
    try {
      await addWish(data);
      showSnackbar('Wish added');
      setShowModal(false);
    } catch {
      showSnackbar('Failed to add wish', 'error');
    }
  };

  const handleDelete = async () => {
    if (wishToDelete) {
      try {
        await deleteWish(wishToDelete.id);
        showSnackbar('Wish deleted');
      } catch {
        showSnackbar('Failed to delete wish', 'error');
      }
      setWishToDelete(null);
    }
  };

  const sortedWishes = [...wishes]
    .sort((a, b) => {
      if (sortDate === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
    })
    .sort((a, b) => {
      if (sortPrice === 'high') {
        return b.price - a.price;
      } else {
        return a.price - b.price;
      }
    });

  const totalPages = Math.ceil(sortedWishes.length / itemsPerPage);
  const paginatedWishes = sortedWishes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Wish List</h1>
        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium shadow"
        >
          + Add Wish
        </button>
      </div>

      <div className="flex flex-wrap gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Sort by date:</label>
          <select
            value={sortDate}
            onChange={e => setSortDate(e.target.value as 'newest' | 'oldest')}
            className="p-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Sort by price:</label>
          <select
            value={sortPrice}
            onChange={e => setSortPrice(e.target.value as 'high' | 'low')}
            className="p-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="high">High to Low</option>
            <option value="low">Low to High</option>
          </select>
        </div>
      </div>

      {paginatedWishes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {paginatedWishes.map(wish => (
            <WishCard
              key={wish.id}
              wish={wish}
              onDelete={() => setWishToDelete(wish)}
              onEdit={() => setEditWish(wish)}
              onInfo={() => navigate(`/wish/${wish.id}`)}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-12 text-lg italic">
          Your list is empty. Add your first wish to get started!
        </p>
      )}

      {sortedWishes.length > 0 && (
        <div className="flex justify-center items-center gap-2 mt-10">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded-full disabled:opacity-50"
          >
            ←
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-full transition ${
                currentPage === i + 1
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded-full disabled:opacity-50"
          >
            →
          </button>
        </div>
      )}

      {showModal && (
        <WishFormModal
          onClose={() => setShowModal(false)}
          onSubmit={handleAdd}
        />
      )}

      {editWish && (
        <WishFormModal
          onClose={() => setEditWish(null)}
          onSubmit={handleUpdate}
          initialData={editWish}
          isEdit
        />
      )}

      {wishToDelete && (
        <ConfirmModal
          message={`Are you sure you want to delete "${wishToDelete.title}"?`}
          onCancel={() => setWishToDelete(null)}
          onConfirm={handleDelete}
        />
      )}

      {snackbar && (
        <Snackbar
          message={snackbar.message}
          type={snackbar.type}
          onClose={() => setSnackbar(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;