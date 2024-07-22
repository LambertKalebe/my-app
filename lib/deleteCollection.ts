'use server';
import { getDatabase } from './db';

async function deleteCollection(): Promise<void> {
    try {
      const db = await getDatabase();
      await db.collection('cardbets').drop();
      console.log(`Coleção "cardbets" deletada com sucesso.`);
    } catch (error) {
      console.error(`Erro ao deletar a coleção cardbets":`, error);
    }
}

export default deleteCollection;
