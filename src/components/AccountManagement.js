"use client";

import { useState, useEffect } from 'react';
import { account, storage } from '@/lib/appwrite';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const AccountManagement = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [avatar, setAvatar] = useState('/default-avatar.png');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
        setEmail('');
        const fileId = currentUser.prefs.avatarFileId;
        if (fileId) {
          const avatarUrl = storage.getFilePreview(process.env.NEXT_PUBLIC_APPWRITE_AVATAR_BUCKET_ID, fileId).href;
          setAvatar(avatarUrl);
        }
      } catch (error) {
        console.error(error);
        router.push('/auth');
      }
    };
    fetchUser();
  }, [router]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (email) {
        await account.updateEmail(email, currentPassword);
      }
      if (currentPassword && newPassword) {
        await account.updatePassword(newPassword, currentPassword);
      }
      if (avatar !== '/default-avatar.png') {
        await account.updatePrefs({ avatarFileId: avatar });
      }
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update profile');
    }
    setLoading(false);
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const response = await storage.createFile(process.env.NEXT_PUBLIC_APPWRITE_AVATAR_BUCKET_ID, 'unique()', file);
        const avatarUrl = storage.getFilePreview(process.env.NEXT_PUBLIC_APPWRITE_AVATAR_BUCKET_ID, response.$id).href;
        setAvatar(avatarUrl);
        await account.updatePrefs({ avatarFileId: response.$id });
      } catch (error) {
        console.error(error);
        toast.error('Failed to upload avatar');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Account Management</h2>
        {user ? (
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border rounded w-full"
                placeholder="Enter new email if you want to change"
              />
            </div>
            {(email || newPassword) && (
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="p-2 border rounded w-full"
                  required
                />
              </div>
            )}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="p-2 border rounded w-full"
                placeholder="Enter new password if you want to change"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Avatar</label>
              <input
                type="file"
                onChange={handleAvatarUpload}
                className="p-2 border rounded w-full"
              />
              {avatar && (
                <img src={avatar} alt="Avatar" className="mt-4 w-32 h-32 rounded-full mx-auto" />
              )}
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded" disabled={loading}>
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        ) : (
          <p>Loading...</p>
        )}
        <a href={`mailto:support@example.com?subject=Mood Tracker - Account Deletion Request&body=Please delete my account with email ${user?.email}`} className="mt-4 block w-full text-center bg-red-600 text-white py-2 px-4 rounded">
          Request Account Deletion
        </a>
      </div>
    </div>
  );
};

export default AccountManagement;
