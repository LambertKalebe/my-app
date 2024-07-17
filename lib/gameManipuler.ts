// gameManager.ts

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
    return false;
  }
}

async function saveVote(card: string, betAmount: number): Promise<boolean> {
  const id = cookies().get('id')?.value;
  const db = await getDatabase();
  const usersCollection = db.collection('users');
  const cardbetsCollection = db.collection('cardbets');
  const votesCount = await cardbetsCollection.countDocuments({});
  const user = await usersCollection.findOne({ id });

  if (!id) {
    console.error('saveVote: UUID do cookie não encontrado:', id);
    return false;
  }

  try {
    if (!user) {
      console.error('saveVote: Usuário não encontrado no banco de dados');
      return false;
    }

    if (user.money < betAmount) {
      console.error('saveVote: Dinheiro insuficiente para a aposta');
      return false;
    }

    if (await VoteCount()) {
      console.error('saveVote: Limite de votos atingido');
      return false;
    }

    // Subtrai o valor da aposta do dinheiro do usuário
    await usersCollection.updateOne({ id }, { $inc: { money: -betAmount } });

    // Insere o voto na tabela cardbets
    await cardbetsCollection.insertOne({ card, id, bet: betAmount });

    console.log('Voto salvo com sucesso! Total De Votos: ' + votesCount);
    return true;
  } catch (error) {
    console.error('saveVote: Erro ao salvar o voto:', error);
    return false;
  }
}

async function VoteCount(): Promise<boolean> {
  const db = await getDatabase();
  const cardbetsCollection = db.collection('cardbets');
  const votesCount = await cardbetsCollection.countDocuments({});
  return votesCount >= 5;
}

async function checkResults(): Promise<'red' | 'blue' | 'yellow' | 'none'> {
  try {
    const db = await getDatabase();
    const cardbetsCollection = db.collection('cardbets');
    const usersCollection = db.collection('users');
    const votesCount = await cardbetsCollection.countDocuments({});
    const id = cookies().get('id')?.value;

    if (votesCount >= 5) {
      const redVotes = await cardbetsCollection.countDocuments({ card: 'red' });
      const blueVotes = await cardbetsCollection.countDocuments({ card: 'blue' });
      const yellowVotes = await cardbetsCollection.countDocuments({ card: 'yellow' });

      const minVotes = Math.min(redVotes, blueVotes, yellowVotes);
      let winningCard: 'red' | 'blue' | 'yellow' | 'none' = 'none';

      if (redVotes === minVotes && blueVotes === minVotes) {
        winningCard = 'blue';
      } else if (redVotes === minVotes && yellowVotes === minVotes) {
        winningCard = 'yellow';
      } else if (blueVotes === minVotes && yellowVotes === minVotes) {
        winningCard = 'yellow';
      } else if (redVotes === minVotes) {
        winningCard = 'red';
      } else if (blueVotes === minVotes) {
        winningCard = 'blue';
      } else if (yellowVotes === minVotes) {
        winningCard = 'yellow';
      }

      console.log(`CARTÃO VENCEDOR: ${winningCard}`);

      // Verifica se o ID do usuário está presente em um voto do cartão vencedor
      const userVote = await cardbetsCollection.findOne({ card: winningCard, id });
      if (userVote && !userVote.rewarded) {
        // Multiplica o valor da aposta do usuário por 2 e soma ao dinheiro dele
        const updatedMoney = userVote.bet * 2;
        await usersCollection.updateOne({ id }, { $inc: { money: updatedMoney } });
        console.log(`Dinheiro do usuário ${id} atualizado: ${updatedMoney}`);

        // Marca o voto como recompensado
        await cardbetsCollection.updateOne({ _id: userVote._id }, { $set: { rewarded: true } });
      }

      return winningCard;
    }

    console.log("CARTÃO VENCEDOR: none");
    return 'none';
  } catch (error) {
    console.error('checkResults: Erro ao obter os resultados:', error);
    return 'none';
  }
}

async function deleteCollection(): Promise<void> {
  try {
    const db = await getDatabase();
    await db.collection('cardbets').drop();
    console.log(`Coleção "cardbets" deletada com sucesso.`);
  } catch (error) {
    console.error(`Erro ao deletar a coleção cardbets":`, error);
  }
}

export default saveVote;
export { checkIfAlreadyVoted, VoteCount, checkResults, deleteCollection };