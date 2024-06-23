import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { account } from '@/lib/appwrite';
import { toast } from 'react-toastify';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { userId, secret } = router.query;

  const handleResetPassword = async () => {
    try {
      await account.updateRecovery(userId, secret, password, password);
      setMessage('Password reset successfully.');
      toast.success('Password reset successfully.');
      router.push('/login');
    } catch (error) {
      console.error(error);
      setMessage('Failed to reset password.');
      toast.error('Failed to reset password.');
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl mb-4">Reset Password</h2>
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border rounded w-full mb-4"
      />
      <button onClick={handleResetPassword} className="bg-blue-600 text-white py-2 px-4 rounded">
        Reset Password
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
