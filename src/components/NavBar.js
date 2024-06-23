import Link from 'next/link';

const NavBar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl">Mood Catcher</h1>
        <div>
          <Link href="/" className="text-white mr-4">Home</Link>
          <Link href="/account" className="text-white mr-4">Account</Link>
          <Link href="/mood" className="text-white mr-4">Mood Entry</Link>
          <Link href="/goals" className="text-white">Goals</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
