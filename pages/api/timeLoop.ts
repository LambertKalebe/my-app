import { NextApiRequest, NextApiResponse } from "next";

export default function timeLoop(req: NextApiRequest, res: NextApiResponse) {
    let number = 1
    if (number == 1) {
        res.status(200).json('Hello World! \n The number is 1 (true)');
        res.send(true);
        number = 2;
    }  else {
        res.status(200).json('Hello World! \n The number is 2 (false)');
        res.send(false);
        number = 1;
    }
}