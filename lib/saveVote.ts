'use server'
import { cookies } from "next/headers";
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

// Função principal para salvar o voto
async function saveVote(card: string, betAmount: number) {
    const id = cookies().get('id')?.value;
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

        // Insere o voto na tabela correspondente (blue, yellow, red)
        const insertVoteQuery = `INSERT INTO ${card} (user_uuid, bet_amount) VALUES ($1, $2)`;
        await pool.query(insertVoteQuery, [id, betAmount]);

        console.log('Voto salvo com sucesso!');
    } catch (error) {
        console.error('Erro ao salvar o voto:', error);
        throw error;
    }
}

export default saveVote;
