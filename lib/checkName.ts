
'use server';
import { cookies } from 'next/headers';
import { getDatabase } from './db';
import { ObjectId } from 'mongodb'; // Certifique-se de importar ObjectId


async function checkName() {
    const id = cookies().get('id')?.value;
  
    if (!id) {
      console.log('checkName: ID não encontrado nos cookies.');
      return null;
    }
  
    try {
      const db = await getDatabase();
      const usersCollection = db.collection('users');
  
      // Converte a string do cookie para ObjectId
      const user = await usersCollection.findOne({ _id: new ObjectId(id) });
  
      if (user) {
        console.log("NOME: " + user.name);
        return user.name;
      } else {
        console.log('Usuário não encontrado.');
        return null;
      }
    } catch (error) {
      console.error('checkName: Erro ao ler o nome do usuário:', error);
      return null;
    }
  }

  export default checkName;