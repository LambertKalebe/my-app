// db.js
'use server';
import { MongoClient, ServerApiVersion } from 'mongodb';
const mongoUrl = "mongodb+srv://default:default@mostra.cxqgmfz.mongodb.net/?retryWrites=true&w=majority&appName=Mostra";

if (!mongoUrl) {
  throw new Error('MongoDB URL is not defined.');
}

let mongoClient: MongoClient | null = null;

async function getMongoClient(): Promise<MongoClient> {
  if (!mongoClient) {
    const url = mongoUrl || '';
    mongoClient = new MongoClient(url, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await mongoClient.connect();
  }
  return mongoClient;
}

async function getDatabase(name: string): Promise<any> {
  const client = await getMongoClient();
  return client.db(name);
}

export { getDatabase };