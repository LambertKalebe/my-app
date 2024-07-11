import { NextApiRequest, NextApiResponse } from "next";

export default function timeLoop(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json({ text: 'Hello' });
    console.log(req.body);
}