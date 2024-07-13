'use server'
import { cookies } from "next/headers";
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});
const id = cookies().get('id')?.value;

/**
 * Verifica se o usuário já votou.
 *
 * @returns {Promise<boolean>} - Uma promessa que é resolvida como verdadeira se o usuário já tiver votado, falsa caso contrário.
 */
async function checkIfAlreadyVoted(): Promise<boolean> {
  try {
    const voteCheckQuery = 'SELECT * FROM cardbets WHERE id = $1';
    const voteCheckResult = await pool.query(voteCheckQuery, [id]);

    return voteCheckResult.rows.length > 0;
  } catch (error) {
    console.error('Erro ao verificar o voto:', error);
    throw error;
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

  if (!id) {
    throw new Error('UUID do cookie não encontrado:' + id);
  }

  try {
    const userQuery = 'SELECT * FROM users WHERE id = $1';
    const userResult = await pool.query(userQuery, [id]);

    // Se o usuário for encontrado e tiver apostas em cartas, continue com a lógica
    console.log('Usuário encontrado e tem apostas em cartas.');

    const user = userResult.rows[0];

    if (user.money < betAmount) {
      throw new Error('Dinheiro insuficiente para a aposta');
    }

    // Subtrai o valor da aposta do dinheiro do usuário
    const updateUserQuery = 'UPDATE users SET money = $1 WHERE id = $2';
    await pool.query(updateUserQuery, [user.money - betAmount, id]);

    // Insere o voto na tabela cardbets
    const insertVoteQuery = 'INSERT INTO cardbets (card, id, bet) VALUES ($1, $2, $3)';
    await pool.query(insertVoteQuery, [card, id, betAmount]);

    console.log('Voto salvo com sucesso!');
  } catch (error) {
    console.error('Erro ao salvar o voto:', error);
    throw error;
  }
}

/**
 * Verifica se o número total de votos atingiu uma determinada contagem.
 *
 * @returns {Promise<boolean>} - Uma promessa que é resolvida como verdadeira se o número total de votos for igual a 6, falsa caso contrário.
 */
async function checkVoteCount(): Promise<boolean> {
    try {
      const countQuery = 'SELECT COUNT(*) FROM cardbets';
      const countResult = await pool.query(countQuery);
      const count = parseInt(countResult.rows[0].count, 10);
  
      return count === 6;
    } catch (error) {
      console.error('Erro ao contar votos:', error);
      throw error;
    }
  }


export default saveVote;
export { checkIfAlreadyVoted, checkVoteCount };