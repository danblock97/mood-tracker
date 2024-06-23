import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { account } from '@/lib/appwrite';
import { toast } from 'react-toastify';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await account.createSession(email, password);
      router.push('/');
      toast.success('Logged in successfully');
    } catch (error) {
      console.error(error);
      setMessage('Failed to log in.');
      toast.error('Failed to log in.');
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl mb-4">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border rounded w-full mb-4"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border rounded w-full mb-4"
      />
      <button onClick={handleLogin} className="bg-blue-600 text-white py-2 px-4 rounded mr-4">
        Login
      </button>
      {message && <p className="mt-4 text-red-600">{message}</p>}
    </div>
  );
}
