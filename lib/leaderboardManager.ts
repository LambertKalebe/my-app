'use server';
import { getDatabase } from './db';

export async function getLeaderboardData() {
  const db = await getDatabase();
  const users = await db.collection('users')
    .find()
    .sort({ money: -1 })
    .limit(10)
    .toArray();
  return users;
}