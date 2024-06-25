"use client";

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import {
  FiLogOut, FiLogIn, FiEdit, FiSettings, FiPlusSquare, FiBookOpen,
  FiMenu, FiX, FiChevronDown, FiChevronUp, FiCheckCircle
} from 'react-icons/fi';
import Image from 'next/image';
import logo from '../../public/logo.webp';

const NavBar = () => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMoodDropdownOpen, setIsMoodDropdownOpen] = useState(false);
  const [isDiaryDropdownOpen, setIsDiaryDropdownOpen] = useState(false);
  const [isGoalsDropdownOpen, setIsGoalsDropdownOpen] = useState(false);

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
        className={`bg-white fixed h-full md:w-60 w-64 p-4 shadow-lg transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'left-0' : '-left-64 md:left-0'
        }`}
      >
        <div className="flex flex-col items-center md:items-start space-y-4">
          <Link href="/" className="text-blue-600 text-lg font-bold hidden md:flex items-center" onClick={handleLinkClick}>
            <Image src={logo} alt="Mood Catcher" className="w-8 h-8 mr-2" />
            Mood Catcher
          </Link>
          {user ? (
            <>
              <div className="w-full">
                <button
                  className="flex items-center space-x-2 w-full"
                  onClick={() => setIsMoodDropdownOpen(!isMoodDropdownOpen)}
                >
                  <FiEdit className="text-blue-600" />
                  <span className="hidden md:block text-gray-900">Mood Actions</span>
                  {isSidebarOpen && <span className="md:hidden text-gray-900">Mood Actions</span>}
                  {isMoodDropdownOpen ? <FiChevronUp className="text-blue-600" /> : <FiChevronDown className="text-blue-600" />}
                </button>
                {isMoodDropdownOpen && (
                  <div className="ml-6 mt-2">
                    <Link href="/add-entry" className="flex items-center space-x-2 mb-2" onClick={handleLinkClick}>
                      <FiEdit className="text-blue-600" />
                      <span className="text-gray-900">Log Mood</span>
                    </Link>
                    <Link href="/moods" className="flex items-center space-x-2" onClick={handleLinkClick}>
                      <FiCheckCircle className="text-blue-600" />
                      <span className="text-gray-900">Check Current Mood</span>
                    </Link>
                  </div>
                )}
              </div>
              <div className="w-full">
                <button
                  className="flex items-center space-x-2 w-full"
                  onClick={() => setIsDiaryDropdownOpen(!isDiaryDropdownOpen)}
                >
                  <FiBookOpen className="text-blue-600" />
                  <span className="hidden md:block text-gray-900">Diary Actions</span>
                  {isSidebarOpen && <span className="md:hidden text-gray-900">Diary Actions</span>}
                  {isDiaryDropdownOpen ? <FiChevronUp className="text-blue-600" /> : <FiChevronDown className="text-blue-600" />}
                </button>
                {isDiaryDropdownOpen && (
                  <div className="ml-6 mt-2">
                    <Link href="/diary" className="flex items-center space-x-2 mb-2" onClick={handleLinkClick}>
                      <FiEdit className="text-blue-600" />
                      <span className="text-gray-900">Log Diary</span>
                    </Link>
                    <Link href="/your-diary" className="flex items-center space-x-2" onClick={handleLinkClick}>
                      <FiBookOpen className="text-blue-600" />
                      <span className="text-gray-900">View Diary</span>
                    </Link>
                  </div>
                )}
              </div>
              <div className="w-full">
                <button
                  className="flex items-center space-x-2 w-full"
                  onClick={() => setIsGoalsDropdownOpen(!isGoalsDropdownOpen)}
                >
                  <FiPlusSquare className="text-blue-600" />
                  <span className="hidden md:block text-gray-900">Goals Actions</span>
                  {isSidebarOpen && <span className="md:hidden text-gray-900">Goals Actions</span>}
                  {isGoalsDropdownOpen ? <FiChevronUp className="text-blue-600" /> : <FiChevronDown className="text-blue-600" />}
                </button>
                {isGoalsDropdownOpen && (
                  <div className="ml-6 mt-2">
                    <Link href="/goals" className="flex items-center space-x-2 mb-2" onClick={handleLinkClick}>
                      <FiEdit className="text-blue-600" />
                      <span className="text-gray-900">Add a Goal</span>
                    </Link>
                    <Link href="/your-goals" className="flex items-center space-x-2" onClick={handleLinkClick}>
                      <FiBookOpen className="text-blue-600" />
                      <span className="text-gray-900">View Goals</span>
                    </Link>
                  </div>
                )}
              </div>
              <Link href="/account" className="flex items-center space-x-2 w-full" onClick={handleLinkClick}>
                <FiSettings className="text-blue-600" />
                <span className="hidden md:block text-gray-900">Settings</span>
                {isSidebarOpen && <span className="md:hidden text-gray-900">Settings</span>}
              </Link>
              <button onClick={logout} className="flex items-center space-x-2 w-full">
                <FiLogOut className="text-blue-600" />
                <span className="hidden md:block text-gray-900">Logout</span>
                {isSidebarOpen && <span className="md:hidden text-gray-900">Logout</span>}
              </button>
            </>
          ) : (
            <Link href="/auth" className="flex items-center space-x-2 w-full" onClick={handleLinkClick}>
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
