// db.js
'use server';
import { MongoClient, ServerApiVersion } from 'mongodb';

const mongoUrl = process.env.MONGO_URI as string;

let mongoClient: MongoClient | null = null;

async function getMongoClient(): Promise<MongoClient> {
  if (!mongoClient) {
    mongoClient = new MongoClient(mongoUrl, {
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

async function getDatabase(): Promise<any> {
  const client = await getMongoClient();
  return client.db('mostra');
}

export { getDatabase };