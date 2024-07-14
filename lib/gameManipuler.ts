'use server';
import { cookies } from "next/headers";
import { getDatabase } from './db';

async function checkIfAlreadyVoted(): Promise<boolean> {
  try {
    const db = await getDatabase('your-database-name');
    const cardbetsCollection = db.collection('cardbets');
    const id = cookies().get('id')?.value;

    const voteCheckResult = await cardbetsCollection.findOne({ id });
    return voteCheckResult !== null;
  } catch (error) {
    console.error('Erro ao verificar o voto:', error);
    throw error;
  }
}

async function saveVote(card: string, betAmount: number) {
  const id = cookies().get('id')?.value;

  if (!id) {
    throw new Error('UUID do cookie não encontrado:' + id);
  }

  try {
    const db = await getDatabase('your-database-name');
    const usersCollection = db.collection('users');
    const cardbetsCollection = db.collection('cardbets');

    const user = await usersCollection.findOne({ id });

    if (!user) {
      throw new Error('Usuário não encontrado no banco de dados');
    }

    if (user.money < betAmount) {
      throw new Error('Dinheiro insuficiente para a aposta');
    }

    // Subtrai o valor da aposta do dinheiro do usuário
    await usersCollection.updateOne({ id }, { $inc: { money: -betAmount } });

    // Insere o voto na tabela cardbets
    await cardbetsCollection.insertOne({ card, id, bet: betAmount });

    console.log('Voto salvo com sucesso!');
  } catch (error) {
    console.error('Erro ao salvar o voto:', error);
    throw error;
  }
}

async function checkVoteCount(): Promise<boolean> {
  try {
    const db = await getDatabase('your-database-name');
    const cardbetsCollection = db.collection('cardbets');

    const count = await cardbetsCollection.countDocuments({});
    return count === 6;
  } catch (error) {
    console.error('Erro ao contar votos:', error);
    throw error;
  }
}

export default saveVote;
export { checkIfAlreadyVoted, checkVoteCount }