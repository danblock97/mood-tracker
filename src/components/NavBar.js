"use client";

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { account, storage } from '@/lib/appwrite';

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("/default-avatar.png"); // Default avatar
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser);

        // Assuming the fileId is stored in the user preferences or profile data
        const fileId = currentUser.prefs?.avatarFileId;
        if (fileId) {
          const bucketId = process.env.NEXT_PUBLIC_APPWRITE_AVATAR_BUCKET_ID;
          const fileUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${fileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}&mode=admin`;
          setAvatarUrl(fileUrl);
        }
      } catch (error) {
        console.error("Failed to fetch user or avatar:", error);
        setUser(null);
      }
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    router.push('/');
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-lg">
          Mood Catcher
        </Link>
        <div className="relative">
          {user ? (
            <div className="flex items-center group">
              <div className="relative">
                <img
                  src={avatarUrl}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 hover:opacity-100 group-hover:block hover:block">
                  <Link href="/account" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                    Account Management
                  </Link>
                  <Link href="/add-entry" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                    Add Entry
                  </Link>
                  <Link href="/diary" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                    Diary
                  </Link>
                  <Link href="/goals" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                    Goals
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link href="/auth" className="text-white">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
