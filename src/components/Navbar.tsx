// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext'; // Adjust the import path based on your folder structure

const Navbar = () => {
  const { user,logout } = useAuth();

 

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <div className="text-white text-lg font-bold">Next app</div>
        <div>
         {!user && (
            <>
          <Link href="/login" className="text-white mx-4">
            Login
          </Link>
          <Link href="/register" className="text-white mx-4">
            Register
          </Link>
            </>
         )}
          {user && (
            <button onClick={logout} className="text-white mx-4">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
