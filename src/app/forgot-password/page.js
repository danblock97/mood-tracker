import { useState } from 'react';
import { account } from '@/lib/appwrite';
import { toast } from 'react-toastify';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async () => {
    try {
      await account.createRecovery(email, `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`);
      setMessage('Password reset email sent.');
      toast.success('Password reset email sent.');
    } catch (error) {
      console.error(error);
      setMessage('Failed to send reset email.');
      toast.error('Failed to send reset email.');
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl mb-4">Forgot Password</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border rounded w-full mb-4"
      />
      <button onClick={handleForgotPassword} className="bg-blue-600 text-white py-2 px-4 rounded">
        Send Reset Email
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
