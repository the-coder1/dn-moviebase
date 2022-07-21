import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react"
import Link from "next/link"
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

export default function Pagination({ dataMovies, pageMovies, id, distancePages }) {
  const [isMobile] = useMediaQuery("(max-width: 768px)")

  if(dataMovies){
    const content = []

    for(let index = 1; index <= 20; index++){
      content.push(
        <Link
          key={index}
          _hover={{ textDecoration: 'none' }}
          _focus={{ outline: "none" }} 
          href={`/genres/${id}?page=${index}`}
        >
          <Box 
            my="2"
            mx={pageMovies == index && "1"}
            p={pageMovies != index ? ["2", , "3"] : ["3", , "4"]}
            borderRadius={pageMovies != index ? "" : "md"}
            bg={pageMovies != index ? "teal.500" : "teal.700"}
            transition="0.25s"
            isDisabled={pageMovies==index}
            _hover={pageMovies != index && {
              cursor: 'pointer',
              transform: 'scale(1.1)',
              backgroundColor: "teal.800",
              boxShadow: 'md',
              borderRadius: "md",
              m: "2"
            }}
          >
            <Text>{index}</Text>
          </Box>
        </Link>
      )
    }

    if(pageMovies != 20){
      content.push(
        <Link
          key="21"
          _hover={{ textDecoration: 'none' }} 
          href={`/genres/${id}?page=${parseInt(pageMovies) + 1}`}
        >
          <Box 
            my="2"
            p={["2", , "3"]}
            bg="teal.500" 
            transition="0.25s" 
            _hover={{
              cursor: 'pointer',
              transform: 'scale(1.1)',
              backgroundColor: "teal.800",
              boxShadow: "md",
              borderRadius: "md",
              mx: "2"
            }}
          >
            <Text>
              {isMobile ? (
                <ChevronRightIcon w='8' h="8" />
              ) : "Next"}
            </Text>
          </Box>
        </Link>
      )
    }

    if(pageMovies != 1) {
      content.unshift(
        <Link
          key="0"
          _hover={{ textDecoration: 'none' }} 
          href={`/genres/${id}?page=${parseInt(pageMovies) - 1}`}
        >
          <Box 
            my="2"
            p={["2", , "3"]}
            bg="teal.500" 
            transition="0.25s" 
            _hover={{
              cursor: 'pointer',
              transform: 'scale(1.1)',
              backgroundColor: "teal.800",
              boxShadow: "md",
              borderRadius: "md",
              mx: '2'
            }}
          >
            <Text>
              {isMobile ? (
                <ChevronLeftIcon w='8' h="8" />
              ) : "Previous"}
            </Text>
          </Box>
        </Link>
      )
    }  

    const isMobileDevice = []

    if(pageMovies != 1) {
      isMobileDevice.unshift(
        <Link
          key="0"
          _hover={{ textDecoration: 'none' }} 
          href={`/genres/${id}?page=${parseInt(pageMovies) - 1}`}
        >
          <Box 
            my="2"
            p={["2", , "3"]}
            bg="teal.500" 
            transition="0.25s" 
            _hover={{
              cursor: 'pointer',
              transform: 'scale(1.1)',
              backgroundColor: "teal.800",
              boxShadow: "md",
              borderRadius: "md",
              mx: '2'
            }}
          >
            <Text>
              {isMobile ? (
                <ChevronLeftIcon w='8' h="8" />
              ) : "Previous"}
            </Text>
          </Box>
        </Link>
      )
    }

    if(pageMovies > distancePages){
      if(pageMovies - parseInt(distancePages) > 1){
        isMobileDevice.push(
          <Box 
            m="1"
            p={["2", , "3"]}
          >
            <Text>.....</Text>
          </Box>
        )
      }
      for(let index = pageMovies - parseInt(distancePages); index <= pageMovies; index++){
        isMobileDevice.push(
          <Link
            key={index}
            _hover={{ textDecoration: 'none' }}
            _focus={{ outline: "none" }} 
            href={`/genres/${id}?page=${index}`}
          >
            <Box 
              my="2"
              mx={pageMovies == index && "1"}
              p={pageMovies != index ? ["2", , "3"] : ["3", , "4"]}
              borderRadius={pageMovies != index ? "" : "md"}
              bg={pageMovies != index ? "teal.500" : "teal.700"}
              transition="0.25s"
              isDisabled={pageMovies==index}
              _hover={pageMovies != index && {
                cursor: 'pointer',
                transform: 'scale(1.1)',
                backgroundColor: "teal.800",
                boxShadow: 'md',
                borderRadius: "md",
                m: "2"
              }}
            >
              <Text>{index}</Text>
            </Box>
          </Link>
        )
      }
    }
  }

  return (
    <Flex 
      my="5"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      
      {isMobileDevice}
    </Flex>
  )
}