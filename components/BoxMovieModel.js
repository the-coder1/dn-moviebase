import Link from "next/link"
import { Box, Image, SlideFade, Text } from "@chakra-ui/react"
import { buildImageUrl } from "../utils/api"
import { useState } from "react"

export default function BoxMovieModel({ id, title, poster_path, widthBox, heightBox }) {
  const [isHover, setHover] = useState(false)

  return (
    <SlideFade 
      in={id} 
      offsetY="50px"
    >
      <Box 
        key={id} 
        boxShadow="md" 
        m="2" 
        borderRadius="md" 
        transition="0.25s" 
        _hover={{
          cursor: 'pointer',
          transform: 'scale(1.05)',
          backgroundColor: "teal.700"
        }}
      >
        <Link 
          _hover={{ textDecoration: 'none' }} 
          href={`/movies/${id}`} 
          passHref
        >
          <Box 
            pos="relative" 
            borderRadius="sm"
          >
            {poster_path ? (
              <Image
                src={buildImageUrl(poster_path, `w500`)}
                alt="Movie poster"
                layout="responsive"
                width={widthBox}
                height={heightBox}
                objectFit="cover"
                borderRadius="md"
                boxShadow="md"
                transition="0.25s"
                opacity={!isHover ? '1' : '0.05'}
              />
            ) : (
              <Box 
                boxShadow="md" 
                borderRadius="sm" 
                w={widthBox} 
                height={heightBox} 
                display="flex" 
                alignItems="center" 
                justifyContent="center"
              >
                <Text 
                  fontSize="lg" 
                  align="center"
                >
                  {title}
                </Text>
              </Box>
            )}
            {poster_path && 
              <Box 
                pos="absolute" 
                bg="transparent" 
                height="100%" 
                width="90%" 
                top="0" 
                left="5%" 
                borderRadius="2xl" 
                display="flex" 
                alignItems="center" 
                justifyContent="center" 
                fontWeight="300"
                transition="0.25s"
                opacity={isHover ? '1' : '0'}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                <Text 
                  fontSize="lg" 
                  align="center"
                >
                  {title}
                </Text>
              </Box>
            }
          </Box>
        </Link>
      </Box>
    </SlideFade>
  )
}