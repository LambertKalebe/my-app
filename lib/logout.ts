'use server';
import { cookies } from 'next/headers';

function logout() {
    cookies().delete('id');
    console.log('Usuário deslogado.');
  }
  
export default logout;