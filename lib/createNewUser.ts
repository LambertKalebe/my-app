'use server';
import { cookies } from 'next/headers';
import { getDatabase } from './db';

async function createUser(name: string) {
  const id = cookies().get('id')?.value;

  if (!id) {
    throw new Error('(createUser)UUID do cookie inválido');
  }

  try {
    const db = await getDatabase('your-database-name');
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
    throw error;
  }
}

export default createUser;