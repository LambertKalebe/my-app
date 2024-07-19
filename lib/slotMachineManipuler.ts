// slotMachineManipulator.ts
'use server'
import { getDatabase } from './db';
import { cookies } from 'next/headers';
import { ObjectId } from 'mongodb'; // Importar ObjectId

const slotMachineManipulator = async (betAmount: number, winningImageId: number) => {
    const id = cookies().get('id')?.value;

    if (!id || typeof id !== 'string') {
        throw new Error('Usuário não encontrado');
    }

    const db = await getDatabase();
    const usersCollection = db.collection('users');

    try {
        // Usar ObjectId para buscar o usuário no banco de dados
        const user = await usersCollection.findOne({ _id: new ObjectId(id) });

        if (!user) {
            throw new Error('Usuário não encontrado, ID encontrado nos cookies: ' + id);
        }

        // Atualizar o dinheiro do usuário no banco de dados
        await usersCollection.updateOne({ _id: new ObjectId(id) }, { $inc: { money: -betAmount } });

        // Verificar se houve vitória
        if (winningImageId !== -1) {
            // Calcular o valor do prêmio com base no ID da imagem vencedora
            let winningAmount;
            switch (winningImageId) {
                case 0: // '/seven.svg'
                    winningAmount = betAmount * 7;
                    break;
                case 1: // '/heart.svg'
                case 2: // '/diamond.svg'
                    winningAmount = betAmount * 3;
                    break;
                default:
                    winningAmount = betAmount * 2;
                    break;
            }

            // Atualizar o dinheiro do usuário no banco de dados com o prêmio
            await usersCollection.updateOne({ _id: new ObjectId(id) }, { $inc: { money: winningAmount } });
            console.log(`Usuário ganhou $${winningAmount}!`);
        } else {
            console.log("slotMachineManipulator: NÃO FOI VITÓRIA");
        }
    } catch (error) {
        console.error('Erro ao manipular o slot machine:', error);
    }
};

export default slotMachineManipulator;