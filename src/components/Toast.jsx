import { useEffect } from 'react';

export const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const id = setTimeout(onClose, 2500);
    return () => clearTimeout(id);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-[9999] bg-gray-900 text-white px-4 py-2 rounded-md shadow-lg">
      {message}
    </div>
  );
};
