'use client'; // This ensures the component is rendered on the client-side

import { useState } from 'react';

export default function NewCreds() {
  const [formData, setFormData] = useState({ siteurl: '', username: '', password: '', comment: '' });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset messages
    setError('');
    setSuccessMessage('');

    // Validation
    if ( !formData.siteurl || !formData.username || !formData.password) {
      setError('Both fields are required');
      return;
    }

    try {
      const response = await fetch('/api/save-creds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Credentials saved successfully!');
        setFormData({ siteurl: '', username: '', password: '', comment: '' });
      } else {
        setError(data.message || 'Error saving credentials');
      }
    } catch (error) {
      setError('Failed to save credentials');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-gray-800">Save New Credentials</h2>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {error && <div className="text-red-500">{error}</div>}
        {successMessage && <div className="text-green-500">{successMessage}</div>}

        <div>
          <label htmlFor="siteurl" className="block text-gray-700">URL</label>
          <input
            type="text"
            id="siteurl"
            name="siteurl"
            value={formData.siteurl}
            onChange={handleChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="username" className="block text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="comment" className="block text-gray-700">Additional Comment</label>
          <textarea
        id="comment"
        name="comment"
        rows="4"
        cols="50"
        value={formData.comment}
        onChange={handleChange}
        className="border rounded-md p-2 w-full text-gray-700"
        placeholder="Add your comment here..."
      ></textarea>
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-blue-800 text-white py-2 rounded"
        >
          Save Credentials
        </button>
      </form>
    </div>
  );
}
