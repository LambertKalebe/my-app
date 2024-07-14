'use server';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';
import { redirect } from 'next/navigation';
import { getDatabase } from './mongo';

export async function checkUser() {
  const id = cookies().get('id')?.value;
  if (!id) {
    const userUUID = uuidv4();
    cookies().set('id', userUUID);
    console.log("Resultado da Busca dos Cookies:" + id)
    console.log("Cookie não encontrado, criando um com o ID: " + userUUID);
    redirect('/login');
  }

  try {
    const db = await getDatabase();
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({ id });

    if (!user) {
      console.log('Usuário não encontrado.');
    } else {
      const userData = {
        id: user.id,
        name: user.name,
        money: user.money,
      };
      return userData;
    }
  } catch (error) {
    console.error('Erro (checkUser.ts):', error);
    throw error;
  }
}

export default checkUser;
