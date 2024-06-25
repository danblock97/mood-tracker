"use client";

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { account, storage } from '@/lib/appwrite';
import { FiLogOut, FiLogIn, FiEdit, FiSettings, FiPlusSquare, FiBookOpen, FiMenu, FiX } from 'react-icons/fi'; // Importing icons

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("/default-avatar.png"); // Default avatar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLinkClick = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <button
        className="md:hidden p-4 text-blue-600 fixed z-50"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>
      <nav
        className={`bg-white fixed md:h-full w-full md:w-60 p-4 shadow-lg transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'left-0' : '-left-full md:left-0'
        }`}
      >
        <div className="flex flex-col items-center md:items-start space-y-4">
          <Link href="/" className="text-blue-600 text-lg font-bold hidden md:block" onClick={handleLinkClick}>
            Mood Catcher
          </Link>
          <Link href="/add-entry" className="flex items-center space-x-2" onClick={handleLinkClick}>
            <FiEdit className="text-blue-600" />
            <span className="hidden md:block text-gray-900">Log Mood</span>
            {isSidebarOpen && <span className="md:hidden text-gray-900">Log Mood</span>}
          </Link>
          <Link href="/diary" className="flex items-center space-x-2" onClick={handleLinkClick}>
            <FiBookOpen className="text-blue-600" />
            <span className="hidden md:block text-gray-900">Log Diary</span>
            {isSidebarOpen && <span className="md:hidden text-gray-900">Log Diary</span>}
          </Link>
          <Link href="/goals" className="flex items-center space-x-2" onClick={handleLinkClick}>
            <FiPlusSquare className="text-blue-600" />
            <span className="hidden md:block text-gray-900">Add a Goal</span>
            {isSidebarOpen && <span className="md:hidden text-gray-900">Add a Goal</span>}
          </Link>
          <Link href="/account-management" className="flex items-center space-x-2" onClick={handleLinkClick}>
            <FiSettings className="text-blue-600" />
            <span className="hidden md:block text-gray-900">Settings</span>
            {isSidebarOpen && <span className="md:hidden text-gray-900">Settings</span>}
          </Link>
          {user ? (
            <button onClick={handleLogout} className="flex items-center space-x-2">
              <FiLogOut className="text-blue-600" />
              <span className="hidden md:block text-gray-900">Logout</span>
              {isSidebarOpen && <span className="md:hidden text-gray-900">Logout</span>}
            </button>
          ) : (
            <Link href="/auth" className="flex items-center space-x-2" onClick={handleLinkClick}>
              <FiLogIn className="text-blue-600" />
              <span className="hidden md:block text-gray-900">Login</span>
              {isSidebarOpen && <span className="md:hidden text-gray-900">Login</span>}
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
