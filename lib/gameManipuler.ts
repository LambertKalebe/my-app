'use server';
import { cookies } from "next/headers";
import { getDatabase } from './db';

async function checkIfAlreadyVoted(): Promise<boolean> {
  try {
    const db = await getDatabase();
    const cardbetsCollection = db.collection('cardbets');
    const id = cookies().get('id')?.value;

    const voteCheckResult = await cardbetsCollection.findOne({ id });
    return voteCheckResult !== null;
  } catch (error) {
    console.error('checkIfAlreadyVoted: Erro ao verificar o voto:', error);
    throw error;
  }
}

async function saveVote(card: string, betAmount: number) {
  const id = cookies().get('id')?.value;

  if (!id) {
    throw new Error('saveVote: UUID do cookie não encontrado:' + id);
  }

  try {
    const db = await getDatabase();
    const usersCollection = db.collection('users');
    const cardbetsCollection = db.collection('cardbets');

    const user = await usersCollection.findOne({ id });

    if (!user) {
      throw new Error('saveVote: Usuário não encontrado no banco de dados');
    }

    if (user.money < betAmount) {
      throw new Error('saveVote: Dinheiro insuficiente para a aposta');
    }

    // Subtrai o valor da aposta do dinheiro do usuário
    await usersCollection.updateOne({ id }, { $inc: { money: -betAmount } });

    // Insere o voto na tabela cardbets
    await cardbetsCollection.insertOne({ card, id, bet: betAmount });

    console.log('Voto salvo com sucesso!');
  } catch (error) {
    console.error('saveVote: Erro ao salvar o voto:', error);
    throw error;
  }
}

async function VoteCount(): Promise<boolean> {
  try {
    const db = await getDatabase();
    const cardbetsCollection = db.collection('cardbets');

    const count = await cardbetsCollection.countDocuments({});
    return count;
  } catch (error) {
    console.error('checkVoteCount: Erro ao contar votos:', error);
    throw error;
  }
}

export default saveVote;
export { checkIfAlreadyVoted, VoteCount }