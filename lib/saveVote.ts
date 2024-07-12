'use server'
import { cookies } from "next/headers";
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});
const id = cookies().get('id')?.value;

// Função para verificar se o usuário já votou
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

// Função principal para salvar o voto
async function saveVote(card: string, betAmount: number) {

  if (!id) {
    throw new Error('UUID do cookie não encontrado');
  }

  try {
    // Verifica se o usuário tem dinheiro suficiente para a aposta
    const userQuery = 'SELECT * FROM users WHERE id = $1';
    const userResult = await pool.query(userQuery, [id]);

    if (userResult.rows.length === 0) {
      throw new Error('Usuário não encontrado');
    }

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
