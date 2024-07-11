import { NextApiRequest, NextApiResponse } from "next";

let booleanState = true; // Estado inicial do booleano

export default function timeLoop(req: NextApiRequest, res: NextApiResponse) {
    if (booleanState) {
        res.status(200).json('Hello World! The boolean is true');
        res.send(true);
    } else {
        res.status(200).json('Hello World! The boolean is false');
        res.send(false);
    }

    // Alternar o estado do booleano para o próximo ciclo
    booleanState = !booleanState;
}
