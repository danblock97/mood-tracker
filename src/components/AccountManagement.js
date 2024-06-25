"use client";

import { useState, useEffect } from 'react';
import { account } from '@/lib/appwrite';
import { toast } from 'react-toastify';

const AccountManagement = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await account.get();
        setEmail(user.email);
      } catch (error) {
        toast.error('Failed to fetch user data');
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateEmail = async () => {
    try {
      await account.updateEmail(email, password);
      toast.success('Email updated successfully');
    } catch (error) {
      toast.error('Failed to update email');
    }
  };

  const handleUpdatePassword = async () => {
    try {
      await account.updatePassword(password, newPassword);
      toast.success('Password updated successfully');
    } catch (error) {
      toast.error('Failed to update password');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg max-w-lg mx-auto mt-12">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Account Management</h2>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-2">Current Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={handleUpdateEmail}
        className="bg-blue-600 text-white py-3 px-6 rounded w-full font-semibold hover:bg-blue-700 transition-colors mb-6"
      >
        Update Email
      </button>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-2">New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={handleUpdatePassword}
        className="bg-blue-600 text-white py-3 px-6 rounded w-full font-semibold hover:bg-blue-700 transition-colors"
      >
        Update Password
      </button>
    </div>
  );
};

export default AccountManagement;
