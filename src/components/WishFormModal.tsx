import { useState } from "react";

interface Props {
  onSubmit: (data: {
    title: string;
    description: string;
    price: number;
    image: string;
  }) => void;
  onClose: () => void;
  initialData?: {
    title: string;
    description: string;
    price: number;
    image: string;
  };
  isEdit?: boolean;
}

const WishFormModal = ({ onSubmit, onClose, initialData, isEdit }: Props) => {
  const [form, setForm] = useState(
    initialData || { title: "", description: "", price: 0, image: "" }
  );

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });

  const validate = () => {
    const newErrors = {
      title: form.title.trim() ? "" : "Title is required",
      description: form.description.trim() ? "" : "Description is required",
      price: form.price > 0 ? "" : "Price must be greater than 0",
      image: form.image.trim().startsWith("http")
        ? ""
        : "Image URL must start with http",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((e) => e === "");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit({ ...form, price: Number(form.price) });
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          {isEdit ? "Edit Wish" : "New Wish"}
        </h2>

        <div className="space-y-4">
          <div>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              rows={3}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300 resize-none"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <div>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price}</p>
            )}
          </div>

          <div>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {isEdit ? "Save" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishFormModal;
