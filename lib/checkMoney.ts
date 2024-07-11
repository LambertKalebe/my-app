'use server';
import { cookies } from 'next/headers';
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

async function checkMoney() {
  // Obtenha o valor do cookie 'id' dentro da função assíncrona
  const id = cookies().get('id')?.value;

  if (!id) {
    console.log('ID não encontrado nos cookies.');
    return null;
  }

  try {
    const query = 'SELECT money FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);

    if (result.rows.length > 0) {
      console.log("DINHEIRO: " + result.rows[0].money);
      return result.rows[0].money;
    } else {
      console.log('Usuário não encontrado.');
      return null;
    }
  } catch (error) {
    console.error('Erro ao ler dinheiro do usuário:', error);
    return null;
  }
}

export default checkMoney;
