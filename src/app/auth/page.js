"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext';

import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';

const AuthPage = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const router = useRouter();
  const { login, register } = useAuth();

  const handleLogin = async (email, password) => {
    try {
      await login(email, password);
      toast.success('Logged in successfully');
      router.push('/add-entry');
    } catch (error) {
      toast.error('Failed to log in');
      console.error(error);
    }
  };

  const handleRegister = async (email, password) => {
    try {
      await register(email, password);
      toast.success('Registered successfully. Please log in.');
      setIsFlipped(false); // Flip to login form
    } catch (error) {
      toast.error(`Failed to register: ${error.message}`);
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative w-full max-w-md auth-card">
        <div className={`card-inner ${isFlipped ? 'rotate-y-180' : ''}`}>
          <div className="absolute inset-0 backface-hidden">
            <LoginForm onLogin={handleLogin} onFlip={() => setIsFlipped(true)} />
          </div>
          <div className="absolute inset-0 backface-hidden rotate-y-180">
            <RegisterForm onRegister={handleRegister} onFlip={() => setIsFlipped(false)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
