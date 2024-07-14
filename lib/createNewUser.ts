'use server';
import { cookies } from 'next/headers';
import { getDatabase } from './mongo';


async function createUser(name: string) {
  const id = cookies().get('id')?.value;
  try {
    const db = await getDatabase();
    const usersCollection = db.collection('users');

    const newUser = {
      id,
      name,
      money: 100,
    };

    const result = await usersCollection.insertOne(newUser);
    console.log('Novo usuário criado com sucesso:', result.insertedId);
  } catch (error) {
    console.error('Erro ao criar novo usuário:', error);
  }
}
export default createUser;
