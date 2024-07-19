'use server';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';
import { redirect } from 'next/navigation';
import { getDatabase } from './db';

async function checkMoney() {
  const id = cookies().get('id')?.value;

  if (!id) {
    console.log('checkMoney: ID não encontrado nos cookies.');
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
    console.error('checkMoney: Erro ao ler dinheiro do usuário:', error);
    return null;
  }
}

async function createUser(name: string) {
    const userUUID = uuidv4()
    cookies().set('id', userUUID)
    const id = cookies().get('id')?.value;
  
    if (!id) {
      throw new Error('createUser: UUID do cookie inválido');
    }
  
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
      console.error('createUser: Erro ao criar novo usuário:', error);
      throw error;
    }
    redirect('/')
  }

export { checkMoney, createUser};