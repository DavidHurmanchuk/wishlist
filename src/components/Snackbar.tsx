interface SnackbarProps {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({ message, type = 'success', onClose }) => {
  return (
    <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow-lg text-white z-50
      ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
      <div className="flex items-center justify-between gap-4">
        <span>{message}</span>
        <button onClick={onClose} className="text-white font-bold text-xl leading-none">×</button>
      </div>
    </div>
  );
};

export default Snackbar;