'use server';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';
import pg from 'pg';
import { redirect } from 'next/navigation';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export async function checkUser() {
  const id = cookies().get('id')?.value;

  if (!id) {
    const userUUID = uuidv4();
    cookies().set('id', userUUID, { path: '/' });
    console.log("Cookie não encontrado, criando um com o ID: " + userUUID);
    redirect('/login');
  }

  try {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      console.log('Usuário não encontrado.');
    } else {
      const user = result.rows[0];
      const UUIDUserAndData = { uuid: id, user };
      return UUIDUserAndData;
    }
  } catch (error) {
    console.error('Erro (checkUser.ts):', error);
    throw error;
  }
}

export default checkUser;
