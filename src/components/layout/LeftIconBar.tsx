// src/components/layout/LeftIconBar.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  QuestionMarkCircleIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';

function LeftIconBar() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center bg-gray-900 text-white w-16 py-4 space-y-6">
      {/* Home */}
      <button onClick={() => navigate('/')} className="hover:text-gray-300">
        <HomeIcon className="h-6 w-6" />
      </button>

      {/* Contact */}
      <button onClick={() => navigate('/contact')} className="hover:text-gray-300">
        <PhoneIcon className="h-6 w-6" />
      </button>
    </div>
  );
}

export default LeftIconBar;
