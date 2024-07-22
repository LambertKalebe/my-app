'use server';
import { cookies } from 'next/headers';
import { getDatabase } from './db';
import { ObjectId } from 'mongodb'; // Certifique-se de importar ObjectId


async function checkMoney() {
    const id = cookies().get('id')?.value;
  
    if (!id) {
      console.log('checkMoney: ID não encontrado nos cookies.');
      return null;
    }
  
    try {
      const db = await getDatabase();
      const usersCollection = db.collection('users');
  
      // Converte a string do cookie para ObjectId
      const user = await usersCollection.findOne({ _id: new ObjectId(id) }, { projection: { money: 1 } });
  
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
  export default checkMoney;