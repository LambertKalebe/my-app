import { NextApiRequest, NextApiResponse } from "next";

let booleanState = true; // Estado inicial do booleano

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('Headers:', req.headers); // Verifique os headers recebidos
    
    if (req.method === 'GET') {
        // Endpoint público para obter o estado atual do booleano
        res.status(200).json({ booleanState });
    } else if (req.method === 'POST' && req.headers.cron == 'true') {
        // Verifica se o header 'cron' tem o valor 'true' para permitir a atualização
        booleanState = !booleanState; // Alternar o estado do booleano
        res.status(200).json({ message: 'Boolean state updated successfully.' });
    } else {
        res.status(403).json({ error: 'Unauthorized' });
    }
}
