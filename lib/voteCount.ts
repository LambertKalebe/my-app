'use server';
import { getDatabase } from './db';

async function VoteCount(): Promise<boolean> {
    const db = await getDatabase();
    const cardbetsCollection = db.collection('cardbets');
    const votesCount = await cardbetsCollection.countDocuments({});
    return votesCount >= 8;
  }

  export default VoteCount;