import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'credentials.db');

// Initialize the database connection
const db = new sqlite3.Database(dbPath);

// Wrapper for db.all() to work with async/await
export const dbAll = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Wrapper for db.get() to work with async/await
export const dbGet = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

// Function to initialize the database (creating the table if it doesn't exist)
export const initializeDb = () => {
  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS credentials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        siteurl TEXT NOT NULL,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        comment TEXT NULL
      )`
    );
  });
};

// Save a credential to the DB (insert)
export const saveCredential = (siteurl,username, password,comment) => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare('INSERT INTO credentials (siteurl,username, password, comment) VALUES (?, ?, ?, ?)');
    stmt.run([siteurl, username, password, comment], function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, siteurl,username, password, comment });
    });
    stmt.finalize();
  });
};
