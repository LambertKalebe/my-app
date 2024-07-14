'use server';
import { cookies } from 'next/headers';
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://default:default@mostra.cxqgmfz.mongodb.net/?appName=Mostra";
const mongoClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function createUser(name: string) {
  const id = cookies().get('id')?.value;
  try {
    await mongoClient.connect();
    const db = mongoClient.db();
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
  } finally {
    await mongoClient.close();
  }
}

export default createUser;