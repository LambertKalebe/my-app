'use server';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';
import { redirect } from 'next/navigation';
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://default:default@mostra.cxqgmfz.mongodb.net/?appName=Mostra";
const mongoClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function checkUser() {
  const id = cookies().get('id')?.value;

  if (!id) {
    const userUUID = uuidv4();
    cookies().set('id', userUUID, { path: '/' });
    console.log("Cookie não encontrado, criando um com o ID: " + userUUID);
    redirect('/login');
  }

  try {
    await mongoClient.connect();
    const db = mongoClient.db();
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
  } finally {
    await mongoClient.close();
  }
}

export default checkUser;