import { Flex } from "@chakra-ui/react"
import BoxMovieModel from "./BoxMovieModel"

export default function FirstMovies({ alignMovies, justifyMovies, wrapMovies, dataMovies, widthMovies, heightMovies, numberMovies }) {
  const content = []
  if(dataMovies.length > 5){
    for(let index = 0; index < numberMovies; index++){
      if(dataMovies !== undefined){
        content.push(
            <BoxMovieModel 
              key={index}
              id={dataMovies[index].id} 
              title={dataMovies[index].title} 
              poster_path={dataMovies[index].poster_path} 
              widthBox={widthMovies}
              heightBox={heightMovies}
            />
        )
      }
    }
  } else {
    for(let index = 0; index < dataMovies.length; index++){
      if(dataMovies !== undefined){
        content.push(
            <BoxMovieModel 
              key={index}
              id={dataMovies[index].id} 
              title={dataMovies[index].title} 
              poster_path={dataMovies[index].poster_path} 
              widthBox={widthMovies}
              heightBox={heightMovies}
            />
        )
      }
    }
  }

  return (
    <Flex
      align={alignMovies} 
      wrap={wrapMovies} 
      justify={justifyMovies}
    >
      {content}
    </Flex>
  )
}