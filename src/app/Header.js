'use client'; // Mark this as a client-side component

import { usePathname } from 'next/navigation'; // Hook to get the current route
import Link from 'next/link';

const Header = () => {
  const pathname = usePathname();
  return (
    <header className="bg-blue-800 text-white py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
        {/* Logo Section */}
        <div className="text-2xl font-semibold">
          <Link href="/">
            Password Manager
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className={`px-4 py-2 rounded-md text-white transition duration-200 ${
              pathname === '/' ? 'bg-blue-600 border-b-2 border-blue-700' : 'hover:bg-blue-600 hover:scale-105'
            }`} >
                Home
              </Link>
            </li>
            <li>
              <Link href="/add-creds" className={`px-4 py-2 rounded-md text-white transition duration-200 ${
  pathname === '/add-creds' 
    ? 'bg-blue-600 border-b-2 border-blue-700' 
    : 'hover:bg-blue-600 hover:scale-105'
}`}>
                Add Credentials
              </Link>
            </li>
            <li>
              <Link href="/view-creds" className={`px-4 py-2 rounded-md text-white transition duration-200 ${
  pathname === '/view-creds' 
    ? 'bg-blue-600 border-b-2 border-blue-700' 
    : 'hover:bg-blue-600 hover:scale-105'
}`}>
                View Credentials
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
