import { collection, getCountFromServer } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Total number of businesses in the directory.
 * Returns null on failure so callers can fall back to qualitative copy.
 */
export async function getBusinessCount() {
  try {
    const snap = await getCountFromServer(collection(db, 'businesses'));
    return snap.data().count;
  } catch (error) {
    console.error('Error fetching business count:', error);
    return null;
  }
}
