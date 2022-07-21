import { Flex } from "@chakra-ui/react"
import BoxMovieModel from "./BoxMovieModel"

export default function FlexMovies({ alignMovies, wrapMovies, justifyMovies, dataMovies, widthMovies, heightMovies }) {
  return (
    <Flex
      align={alignMovies} 
      wrap={wrapMovies} 
      justify={justifyMovies}
    >
      {dataMovies.map(({ id, title, poster_path }) => (
        <BoxMovieModel 
          key={id}
          id={id} 
          title={title} 
          poster_path={poster_path} 
          widthBox={widthMovies}
          heightBox={heightMovies}
        />
      ))}
    </Flex>
  )
}