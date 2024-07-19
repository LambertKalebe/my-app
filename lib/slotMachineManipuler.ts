// slotMachineManipulator.ts
'use server'
import { getDatabase } from './db';
import { cookies } from 'next/headers';

const slotMachineManipulator = async (betAmount: number, winningImageId: number) => {
    const id = cookies().get('id')?.value;

    if (!id || typeof id !== 'string') {
        throw new Error('Usuário não encontrado');
    }

    const db = await getDatabase();
    const usersCollection = db.collection('users');

    try {
        // Buscar o usuário no banco de dados
        const user = await usersCollection.findOne({ id });

        if (!user) {
            throw new Error('Usuário não encontrado, ID encontrado nos cookies: ' + id);
        }

        // Atualizar o dinheiro do usuário no banco de dados
        await usersCollection.updateOne({ id }, { $inc: { money: -betAmount } });

        // Verificar se houve vitória
        if (winningImageId !== -1) {
            // Calcular o valor do prêmio com base no ID da imagem vencedora
            let winningAmount;
            switch (winningImageId) {
                case 0: // '/seven.svg'
                    winningAmount = betAmount + (betAmount * 7);
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
            await usersCollection.updateOne({ id }, { $inc: { money: winningAmount } });
            console.log(`Usuário ganhou $${winningAmount}!`);
        } else {
            console.log("slotMachineManipulator: NAO FOI VITORIA");
        }
    } catch (error) {
        console.error('Erro ao manipular o slot machine:', error);
    }
};

export default slotMachineManipulator;
