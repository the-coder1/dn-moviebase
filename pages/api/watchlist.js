import Watchlist from '../../models/Watchlist';
import dbConnect from '../../utils/dbConnect';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  if (method === 'GET') {
    const watchlists = await Watchlist.find();

    if (watchlists) {
      res.status(200).json(watchlists);
    } else {
      res.status(404).json({ message: "You haven't added any movies to the viewing section!" });
    }
  }
  res.status(400).end();
}
