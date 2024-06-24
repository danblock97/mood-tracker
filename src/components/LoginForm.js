"use client";

import { useState } from 'react';
import Link from 'next/link';

const LoginForm = ({ onLogin, onFlip }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl mb-6">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Email</label>
          <input
            type="email"
            className="w-full p-3 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-gray-700">Password</label>
          <input
            type="password"
            className="w-full p-3 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded">
          Login
        </button>
      </form>
      <p className="mt-4 text-center text-gray-700">
        <Link href="/forgot-password" className="text-blue-600 hover:underline">
          Forgot Password?
        </Link>
      </p>
      <p className="mt-6 text-center text-gray-700">
        No account?{' '}
        <button type="button" onClick={onFlip} className="text-blue-600 hover:underline">
          Register here
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
