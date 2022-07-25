import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react"
import Link from "next/link"
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

const ButtonPage = ({ keyButton, index, page, id, contentButton }) => {
  return (
    <Link
      key={keyButton}
      _hover={{ textDecoration: 'none' }}
      _focus={{ outline: "none" }} 
      href={`/genres/${id}?page=${index}`}
    >
      <Box 
        my="2"
        mx={page === index ? "2" : "1"}
        p={page !== index ? ["3", , "4"] : ["4", , "5"]}
        borderRadius={page !== index ? "sm" : "md"}
        bg={page !== index ? "teal.600" : "teal.700"}
        transition="0.25s"
        isDisabled={page === index}
        _hover={page !== index && {
          cursor: 'pointer',
          transform: 'scale(1.1)',
          backgroundColor: "teal.800",
          boxShadow: 'md',
          borderRadius: "md",
          m: "2"
        }}
      >
        <Text>{contentButton}</Text>
      </Box>
    </Link>
  )
}

export default function Pagination({ pageMovies, id, showPages }) {
  const [isMobile] = useMediaQuery("(max-width: 768px)") 

  const page = parseInt(pageMovies)
  const show = parseInt(showPages)
  const content = []

  if(page !== 1){
    content.push(
      <ButtonPage
        keyButton="0"
        index={page - 1}
        page={page}
        id={id}
        contentButton={
          isMobile ? (
            <ChevronLeftIcon w={["6", , "8"]} h={["6", , "8"]} />
          ) : "Previous"
        }
      />
    )
  }

  if(page - show > 1 && !isMobile){
    content.push(
      <Box 
        m="1"
        p={["1", , "2"]}
      >
        <Text>.....</Text>
      </Box>
    )
  }

  for(let index = (page > show ? page - show : 1); index <= (page > show ? page : show); index++){
    content.push(
      <ButtonPage
        keyButton={index}
        index={index}
        page={page}
        id={id}
        contentButton={index}
      />
    )
  }
  
  for(let index = page + 1; index < (page < 20 - show ? page + 1 + show : 21); index++){
    content.push(
      <ButtonPage
        keyButton={index}
        index={index}
        page={page}
        id={id}
        contentButton={index}
      />
    )
  }

  if(20 - show > page && !isMobile) {
    content.push(
      <Box 
        m="1"
        p={["1", , "2"]}
      >
        <Text>.....</Text>
      </Box>
    )
  }

  if(page < 20){
    content.push(
      <ButtonPage
        keyButton="21"
        index={page + 1}
        page={page}
        id={id}
        contentButton={
          isMobile ? (
            <ChevronRightIcon w={["6", , "8"]} h={["6", , "8"]} />
          ) : "Next"
        }
      />
    )
  }

  return (
    <Flex 
      my="5"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {content}
    </Flex>
  )
}