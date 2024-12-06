import { NextResponse } from 'next/server';
import { dbAll, dbGet, initializeDb } from '../../../lib/db';

// Initialize the database
initializeDb();

export async function GET(request) {
  // Parse pagination parameters
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = 10;  // Number of items per page
  const offset = (page - 1) * limit;

  try {
    // Fetch credentials with pagination
    const credentials = await dbAll(
      `SELECT * FROM credentials LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    // Get total number of credentials to calculate total pages
    const countResult = await dbGet('SELECT COUNT(*) AS count FROM credentials');
    const totalPages = Math.ceil(countResult.count / limit);

    // Return the response with credentials and pagination info
    return NextResponse.json({
      data: credentials,
      totalPages,
      page
    });
  } catch (err) {
    return NextResponse.json({ message: 'Error fetching credentials', error: err.message }, { status: 500 });
  }
}
