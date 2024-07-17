// leaderboard.server.js
'use server';
import { getDatabase } from './db';

export async function getLeaderboardData() {
  const db = await getDatabase();
  const users = await db.collection('users').find().sort({ money: -1 }).toArray();
  return users;
}