import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // create database connection
  const jateDb = await openDB('jate', 1);
  // create new transaction with readwrite permissions
  const tx = jateDb.transaction('jate', 'readwrite');
  // create object store
  const store = tx.objectStore('jate');
  // confirm request
  const request = store.put({ text: content });
  const result = await request;
  console.log('🚀 - Data saved to the database!', result);
}

// Method that gets all the content from the database
export const getDb = async () => {
  // create database connection
  const jateDb = await openDB('jate', 1);
  // create new transaction with readonly permissions
  const tx = jateDb.transaction('jate', 'readonly');
  // open object store
  const store = tx.objectStore('jate');
  // getAll() method
  const request = store.getAll();
  // confirm request
  const result = await request;
  console.log('result.value', result);
  return result;
}

initdb();
