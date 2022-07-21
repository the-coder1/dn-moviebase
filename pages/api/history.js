import History from '../../models/History';
import dbConnect from '../../utils/dbConnect';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  if (method === 'GET') {
    const histories = await History.find();

    if (histories) {
      res.status(200).json(histories);
    } else {
      res.status(404).json({ message: "You haven't added any movies to the history section!" });
    }
  }
  res.status(400).end();
}
