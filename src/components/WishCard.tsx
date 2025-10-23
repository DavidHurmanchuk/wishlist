import type { Wish } from "../context/WishContext";
import { FaTrashAlt, FaInfoCircle, FaEdit } from "react-icons/fa";

interface Props {
  wish: Wish;
  onDelete?: () => void;
  onEdit?: () => void;
  onInfo?: () => void;
}

const WishCard = ({ wish, onDelete, onEdit, onInfo }: Props) => {
  const shortDescription =
    wish.description.length > 60
      ? wish.description.slice(0, 57).trim() + "..."
      : wish.description;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden flex flex-col justify-between">
      <img
        src={wish.image}
        alt={wish.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 flex-grow">
        <h2 className="text-lg font-semibold text-gray-800">{wish.title}</h2>
        <p className="text-sm text-gray-600">{shortDescription}</p>
        <p className="mt-2 text-right text-lg font-bold text-green-600">
          ${wish.price}
        </p>
      </div>

      <div className="flex justify-between items-center px-4 py-3 border-t bg-gray-50">
        {onInfo && (
          <button
            onClick={onInfo}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <FaInfoCircle />
            <span>Info</span>
          </button>
        )}
        {onEdit && (
          <button
            onClick={onEdit}
            className="text-yellow-600 hover:text-yellow-800 flex items-center gap-1"
          >
            <FaEdit />
            <span>Change</span>
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="text-red-600 hover:text-red-800 flex items-center gap-1"
          >
            <FaTrashAlt />
            <span>Delete</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default WishCard;
