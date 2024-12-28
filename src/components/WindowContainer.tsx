import React from 'react';

type WindowContainerProps = {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

/**
 * A modernized "window" with animated transitions, emojis, and responsive design.
 */
function WindowContainer({ title, onClose, children }: WindowContainerProps) {
  return (
    <div
      className={`
        absolute
        top-4
        right-4
        w-[90vw]
        h-[70vh]
        sm:w-[500px]
        sm:h-[400px]
        max-w-[500px]
        max-h-[400px]
        border-2
        border-red-600
        shadow-xl
        bg-gradient-to-b
        from-gray-100
        to-white
        rounded-lg
        flex
        flex-col
        overflow-hidden
        transition-transform
        hover:scale-105
      `}
    >
      {/* Title bar */}
      <div className="bg-gray-800 text-white flex items-center h-10 px-4 border-b border-gray-700 shadow">
        <button
          onClick={onClose}
          className="ml-auto bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded shadow transition"
          title="Close"
        >
          ❌
        </button>
        <span className="text-base font-bold ml-2 truncate">
          {title} 📂
        </span>
      </div>

      {/* Content area */}
      <div className="flex-1 p-4 text-gray-800 overflow-auto">
        {children}
      </div>
    </div>
  );
}

export default WindowContainer;
