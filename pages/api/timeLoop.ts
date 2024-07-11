export default function timeLoop(req, res) {
    res.status(200).json({ text: 'Hello' });
    console.log(req.body);
  }