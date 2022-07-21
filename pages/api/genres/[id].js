import { fetcher } from '../../../utils/api';

const getMovieUrl = (id, page) =>
`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=${id}&page=${page}`

export default async function handler(req, res) {
  const movie = await fetcher(getMovieUrl(req.query.id, req.query.page));

  res.status(200).json(movie);
}