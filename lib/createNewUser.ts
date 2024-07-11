'use server';
import { cookies } from 'next/headers';
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})


async function createUser(name:string) {
  const id = cookies().get('id')?.value;
  try {
    const query = 'INSERT INTO users (id, name, money) VALUES ($1, $2, $3)';
    const values = [id, name, 100];
    const result = await pool.query(query, values);
    console.log('Novo usuário criado com sucesso:', result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar novo usuário:', error);
  }
}
export default createUser;
