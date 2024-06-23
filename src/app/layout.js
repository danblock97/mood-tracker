import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from '../components/NavBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Mood Catcher',
  description: 'Track your mood and activities daily',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 text-gray-900`}>
        <NavBar />
        <main className="container mx-auto p-4">
          {children}
        </main>
        <ToastContainer />
      </body>
    </html>
  );
}
