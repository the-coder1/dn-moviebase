import { Box, Flex } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { useState } from "react";
import BoxMovieModel from "./BoxMovieModel";

const ArrowBox = ({ arrow, move }) => {
  return (
    <Box
      cursor="pointer"
      mx="5"
      p="0"
      borderRadius="md"
      boxShadow="md"
      bg="gray.700"
      transition="0.25s"
      onClick={move}
      _hover={{
        transform: "scale(1.2)",
        bg: "teal.500"
      }}
      _active={{
        bg: "teal.700",
        transform: "scale(1.1)",
        mx: "5"
      }}
    >
      {arrow}
    </Box>
  )
}

export default function Carousel({ dataMovies, showItems, widthMovies, heightMovies }) {
  const [currentPage, setCurrentPage] = useState(0)

  const current = parseInt(currentPage)
  const show = parseInt(showItems)

  const content = []

  if(dataMovies.length <= showItems) {
    for(let index = current; index < dataMovies.length; index++) {
      content.push(
        <BoxMovieModel 
            key={dataMovies[index].id}
            id={dataMovies[index].id} 
            title={dataMovies[index].title} 
            poster_path={dataMovies[index].poster_path} 
            widthBox={widthMovies}
            heightBox={heightMovies}
        />
      )
    }
  } else {
    if(current <= dataMovies.length - show){
      for(let index = current; index < show + current; index++) {
        content.push(
          <BoxMovieModel 
              key={dataMovies[index].id}
              id={dataMovies[index].id} 
              title={dataMovies[index].title} 
              poster_path={dataMovies[index].poster_path} 
              widthBox={widthMovies}
              heightBox={heightMovies}
          />
        )
      }
    } else if(current >= show && current <= dataMovies.length){
      for(let index = current; index < dataMovies.length; index++) {
        content.push(
          <BoxMovieModel 
              key={dataMovies[index].id}
              id={dataMovies[index].id} 
              title={dataMovies[index].title} 
              poster_path={dataMovies[index].poster_path} 
              widthBox={widthMovies}
              heightBox={heightMovies}
          />
        )
      }
      for(let index = 0; index < current + show - dataMovies.length; index++) {
        content.push(
          <BoxMovieModel 
              key={dataMovies[index].id}
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
      pos="relative"
      align="center" 
      wrap="nowrap" 
      justify="center"
      my="3"
    >
      {show < dataMovies.length && (
        <ArrowBox 
          arrow={<ChevronLeftIcon w="10" h="10" />}
          move={() => setCurrentPage(current === 0 ? dataMovies.length - 1 : current - 1)}
        />
      )}
      {content}
      {show < dataMovies.length && (
        <ArrowBox
          arrow={<ChevronRightIcon w="10" h="10" />}
          move={() => setCurrentPage(current + show === dataMovies.length + show - 1 ? 0 : current + 1)}
        />
      )}
    </Flex>
  )
}