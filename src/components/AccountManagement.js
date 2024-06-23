import { useState, useEffect } from 'react';
import { account, storage } from '@/lib/appwrite';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const AccountManagement = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        setUser(user);
        setUsername(user.name);
        setAvatar(user.prefs.avatar || '');
      } catch (error) {
        console.error(error);
        router.push('/login');
      }
    };
    fetchUser();
  }, [router]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await account.updateName(username);
      if (avatar) {
        await account.updatePrefs({ avatar });
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
      } catch (error) {
        console.error(error);
        toast.error('Failed to upload avatar');
      }
    }
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      router.push('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl mb-4">Account Management</h2>
      {user ? (
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-2 border rounded w-full"
              required
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
              <img src={avatar} alt="Avatar" className="mt-4 w-32 h-32 rounded-full" />
            )}
          </div>
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded" disabled={loading}>
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={handleLogout} className="mt-4 bg-red-600 text-white py-2 px-4 rounded">
        Logout
      </button>
    </div>
  );
};

export default AccountManagement;
