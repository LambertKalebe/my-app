'use server';
import { cookies } from "next/headers";
import { ObjectId } from "mongodb"; // Importa ObjectId
import { getDatabase } from './db';
async function saveVote(card: string, betAmount: number): Promise<boolean> {
  const id = cookies().get('id')?.value;
  const db = await getDatabase();
  const usersCollection = db.collection('users');
  const cardbetsCollection = db.collection('cardbets');

  if (!id) {
    console.error('saveVote: UUID do cookie não encontrado:', id);
    return false;
  }

  try {
    const [user, votesCount] = await Promise.all([
      usersCollection.findOne({ _id: new ObjectId(id) }),
      cardbetsCollection.countDocuments({})
    ]);

    if (!user) {
      console.error('saveVote: Usuário não encontrado no banco de dados');
      return false;
    }

    if (user.money < betAmount) {
      console.error('saveVote: Dinheiro insuficiente para a aposta');
      return false;
    }

    if (votesCount >= 8) {
      console.error('saveVote: Limite de votos atingido');
      return false;
    }

    // Subtrai o valor da aposta do dinheiro do usuário
    await usersCollection.updateOne({ _id: new ObjectId(id) }, { $inc: { money: -betAmount } });

    // Insere o voto na tabela cardbets
    await cardbetsCollection.insertOne({ card, id: new ObjectId(id), bet: betAmount });

    console.log('Voto salvo com sucesso! Total De Votos: ' + (votesCount + 1));
    return true;
  } catch (error) {
    console.error('saveVote: Erro ao salvar o voto:', error);
    return false;
  }
}
export default saveVote;