'use server';
import { cookies } from 'next/headers';
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://default:default@mostra.cxqgmfz.mongodb.net/?appName=Mostra";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const mongoClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function checkMoney() {
  const id = cookies().get('id')?.value;

  if (!id) {
    console.log('ID não encontrado nos cookies.');
    return null;
  }

  try {
    await mongoClient.connect();
    const db = mongoClient.db();
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({ id }, { projection: { money: 1 } });

    if (user) {
      console.log("DINHEIRO: " + user.money);
      return user.money
    } else {
      console.log('Usuário não encontrado.');
      return null;
    }
  } catch (error) {
    console.error('Erro ao ler dinheiro do usuário:', error);
    return null;
  } finally {
    await mongoClient.close();
  }
}

export default checkMoney