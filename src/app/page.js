import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-12 px-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the Password Manager</h1>
        <p className="text-lg text-gray-700 mb-6">
          This app allows you to securely store and manage your credentials. 
          You can easily add new credentials and view your saved credentials with just a few clicks. 
        </p>

        <div className="flex justify-center gap-6">
          {/* Link to Add Credentials Page */}
          <Link
            href="/add-creds" // Link to the "Add Credentials" page
            className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition duration-200"
          >
            Add Credentials
          </Link>

          {/* Link to View Credentials Page */}
          <Link
            href="/view-creds" // Link to the "View Credentials" page
            className="bg-gray-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-gray-700 transition duration-200"
          >
            View Credentials
          </Link>
        </div>
      </div>
    </div>
  );
}