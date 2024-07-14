'use server';
import { cookies } from 'next/headers';
import { getDatabase } from './db';

async function checkMoney() {
  const id = cookies().get('id')?.value;

  if (!id) {
    console.log('CheckMoney: ID não encontrado nos cookies.');
    return null;
  }

  try {
    const db = await getDatabase('your-database-name');
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

export default checkMoney;