'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
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

async function login(name: string, password: string) {
  try {
    const db = await getDatabase();
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({ name, password });
    if (user) {
      cookies().set('id', user._id.toString());
      console.log('Usuário logado com sucesso:', user.name);
      return { success: true };
    } else {
      console.log('Usuário ou senha inválidos.');
      return { success: false, message: 'Usuário ou senha inválidos.' };
    }
  } catch (error) {
    console.error('login: Erro ao fazer login:', error);
    return { success: false, message: "Erro ao fazer login." };
  }
}

function logout() {
  cookies().delete('id');
  console.log('Usuário deslogado.');
}

export { checkMoney, checkName, register, login, logout };