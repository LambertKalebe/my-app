'use server';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';
import { redirect } from 'next/navigation';
import { getDatabase } from './mongo';
const id = cookies().get('id')?.value.toString();
export async function checkUser() {

  if (!id) {
    const userUUID = uuidv4();
    cookies().set('id', userUUID, { path: '/' });
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

async function createUser(name: string) {
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

async function checkMoney() {

  if (!id) {
    console.log('ID não encontrado nos cookies.');
    return null;
  }

  try {
    const db = await getDatabase();
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({ id }, { projection: { money: 1 } });

    if (user) {
      console.log("DINHEIRO: " + user.money);
      return user.money;
    } else {
      console.log('Usuário não encontrado.');
      return null;
    }
  } catch (error) {
    console.error('Erro ao ler dinheiro do usuário:', error);
    return null;
  }
}

export default checkUser;
export { createUser, checkMoney };