'use server';
import { getDatabase } from './db';

export async function getLeaderboardData() {
  const db = await getDatabase();
  const users = await db.collection('users')
    .find()
    .sort({ money: -1 })
    .limit(10)
    .toArray();

  // Converte os dados dos usuários para um formato simples
  return users.map((user: { _id: { toString: () => any; }; name: any; money: any; }) => ({
    _id: user._id.toString(), // Converte o ObjectId para string
    name: user.name,
    money: user.money,
  }));
}