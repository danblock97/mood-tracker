import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/NavBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Mood Catcher',
  description: 'Track your mood and activities daily',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 text-gray-900`}>
        <AuthProvider>
          <div className="flex">
            <NavBar />
            <main className="flex-grow p-4 md:p-8">
              {children}
            </main>
          </div>
          <ToastContainer />
        </AuthProvider>
      </body>
    </html>
  );
}
