import { fetcher } from '../../utils/api';

const getPopularMovies = () =>
  `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&`;

export default async function handler(req, res) {
  const results = await fetcher(getPopularMovies())

  res.status(200).json(results);
}
