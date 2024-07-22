'use server';
import { cookies } from 'next/headers';
import { getDatabase } from './db';


async function register(name: string, password: string) {
    try {
      const db = await getDatabase();
      const usersCollection = db.collection('users');
  
      const existingUser = await usersCollection.findOne({ name });
      if (existingUser) {
        console.error('register: Já existe um usuário com o nome:', name);
        return { success: false, message: "Já existe um usuário com este nome." };
      }
  
      const newUser = {
        name,
        password,
        money: 100,
      };
  
      const result = await usersCollection.insertOne(newUser);
      console.log('Novo usuário criado com sucesso:', result.insertedId);
      cookies().set('id', result.insertedId.toString());
      
      return { success: true };
    } catch (error) {
      console.error('createUser: Erro ao criar novo usuário:', error);
      return { success: false, message: "Erro ao criar o usuário."};
    }
  }

  export default register;