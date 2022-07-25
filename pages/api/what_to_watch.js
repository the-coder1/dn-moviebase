import { fetcher } from "../../utils/api";

const chooseRandom = (num) => {
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

  const result = []

  for(let index = 0; index < num; index++){
    const randomGenre = Math.floor(Math.random() * genres.length)

    result.push(genres[randomGenre]);

    genres.splice(randomGenre, 1)
  }

  return result
}

const random = chooseRandom(3)

random.forEach(item => {
  let getMovieUrl = () => `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=${item.id}`

  item.url = getMovieUrl()
})

export default async function handler(req, res) {
  random.forEach(async item => {
    item.movies = await fetcher(item.url)
  })
  
  res.status(200).json(random)
}