import { NextResponse } from 'next/server';
import { initializeDb, saveCredential } from '../../../lib/db';

// Initialize DB connection (only once)
initializeDb();

export async function POST(request) {
  const { siteurl,username, password,comment } = await request.json();
  
  // Validation: Check if the username and password are provided
  if (!siteurl || !username || !password) {
    return NextResponse.json({ message: 'Site URL, Username and password are required' }, { status: 400 });
  }

  try {
    // Save credentials in the database
    const newCredential = await saveCredential(siteurl, username, password, comment);

    // Respond with success message
    return NextResponse.json({ message: 'Credentials saved successfully!', data: newCredential });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to save credentials', error: error.message }, { status: 500 });
  }
}
