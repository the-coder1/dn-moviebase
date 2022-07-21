import { fetcher } from '../../utils/api';

const popularMovies = () => `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}`

export default async function handler(req, res) {
  const movies = await fetcher(popularMovies())

  res.status(200).json(movies)
}