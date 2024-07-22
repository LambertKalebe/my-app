'use server';
import { cookies } from "next/headers";
import { ObjectId } from "mongodb"; // Importa ObjectId
import { getDatabase } from './db';

async function checkIfAlreadyVoted(): Promise<boolean> {
  try {
    const db = await getDatabase();
    const cardbetsCollection = db.collection('cardbets');
    const id = cookies().get('id')?.value;

    if (!id) {
      console.error('checkIfAlreadyVoted: ID não encontrado nos cookies.');
      return false;
    }

    const voteCheckResult = await cardbetsCollection.findOne({ id: new ObjectId(id) }); // Converte o id para ObjectId
    return voteCheckResult !== null;
  } catch (error) {
    console.error('checkIfAlreadyVoted: Erro ao verificar o voto:', error);
    return false;
  }
}

export default checkIfAlreadyVoted;