import { useState, useEffect } from 'react';
import { account } from '../appwrite'; // Ensure you have configured the Appwrite client
import { useRouter } from 'next/router';

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
        router.push('/login'); // Redirect to login if the user is not authenticated
      }
    };
    fetchUser();
  }, [router]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await account.updateName(username);
      await account.updatePrefs({ avatar });
      alert('Profile updated successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to update profile');
    }
    setLoading(false);
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
            <label className="block text-gray-700 mb-2">Avatar URL</label>
            <input
              type="url"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="p-2 border rounded w-full"
            />
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
