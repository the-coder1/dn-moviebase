import { fetcher } from '../../utils/api';

const genres = [
  { title: 'Action', id: 28 },
  { title: 'Animated', id: 16 },
  { title: 'Documentary', id: 99 },
  { title: 'Drama', id: 18 },
  { title: 'Family', id: 10751 },
  { title: 'Fantasy', id: 14 },
  { title: 'History', id: 36 },
  { title: 'Comedy', id: 35 },
  { title: 'War', id: 10752 },
  { title: 'Crime', id: 80 },
  { title: 'Music', id: 10402 },
  { title: 'Mystery', id: 9648 },
  { title: 'Romance', id: 10749 },
  { title: 'Sci-Fi', id: 878 },
  { title: 'Horror', id: 27 },
  { title: 'TV movie', id: 10770 },
  { title: 'Thriller', id: 53 },
  { title: 'Western', id: 37 },
  { title: 'Adventure', id: 12 }
]

const chooseRandom = (arr, num = 1) => {
  const result = []

  for(let index = 0; index < num; index++){
    const randomGenre = Math.floor(Math.random() * arr.length)
    
    if(result.indexOf(arr[randomGenre]) !== -1){
      continue;
    };

    result.push(arr[randomGenre]);
    index++;
  }

  return result
}

const recommendMovies = chooseRandom(genres, 5)

const getMovies = (id) => `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=${id}`

export default async function handler(req, res) {

  const results = []

  recommendMovies.forEach(async item => {
    let movie = {}
    let movies = await fetcher(getMovies(item.id))
  
    movie.title = await item.title
    movie.movies = await movies
  
    results.push(movie)
  })

  res.status(200).json(results)
}