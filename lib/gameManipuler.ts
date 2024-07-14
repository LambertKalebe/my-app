'use server'
import { cookies } from "next/headers";
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
/**
 * Verifica se o usuário já votou.
 *
 * @returns {Promise<boolean>} - Uma promessa que é resolvida como verdadeira se o usuário já tiver votado, falsa caso contrário.
 */
async function checkIfAlreadyVoted(): Promise<boolean> {
  try {
    await mongoClient.connect();
    const db = mongoClient.db();
    const cardbetsCollection = db.collection('cardbets');
    const id = cookies().get('id')?.value;

    const voteCheckResult = await cardbetsCollection.findOne({ id });
    return voteCheckResult !== null;
  } catch (error) {
    console.error('Erro ao verificar o voto:', error);
    throw error;
  } finally {
    await mongoClient.close();
  }
}

/**
 * Salva um voto para uma carta específica com um valor de aposta.
 *
 * @param {string} card - A carta para a qual o voto está sendo salvo.
 * @param {number} betAmount - O valor da aposta sendo feita na carta.
 *
 * @throws Lançará um erro se o ID do cookie do usuário não for encontrado, se o usuário não for encontrado no banco de dados ou se o usuário não tiver dinheiro suficiente para fazer a aposta.
 */
async function saveVote(card: string, betAmount: number) {
  const id = cookies().get('id')?.value;

  if (!id) {
    throw new Error('UUID do cookie não encontrado:' + id);
  }

  try {
    await mongoClient.connect();
    const db = mongoClient.db();
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
  } finally {
    await mongoClient.close();
  }
}

/**
 * Verifica se o número total de votos atingiu uma determinada contagem.
 *
 * @returns {Promise<boolean>} - Uma promessa que é resolvida como verdadeira se o número total de votos for igual a 6, falsa caso contrário.
 */
async function checkVoteCount(): Promise<boolean> {
  try {
    await mongoClient.connect();
    const db = mongoClient.db();
    const cardbetsCollection = db.collection('cardbets');

    const count = await cardbetsCollection.countDocuments({});
    return count === 6;
  } catch (error) {
    console.error('Erro ao contar votos:', error);
    throw error;
  } finally {
    await mongoClient.close();
  }
}

export default saveVote;
export { checkIfAlreadyVoted, checkVoteCount };