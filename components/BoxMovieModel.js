import Link from "next/link"
import Image from "next/image"
import { Box, SlideFade, Text } from "@chakra-ui/react"
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
        pos="relative" 
        boxShadow="md" 
        width={widthBox}
        height={heightBox}
        m="2" 
        transition="0.25s" 
        _hover={{
          cursor: 'pointer',
          transform: 'scale(1.05)',
          backgroundColor: "teal.700"
        }}
      >
        <Link 
          width={widthBox}
          height={heightBox}
          _hover={{ textDecoration: 'none' }} 
          href={`/movies/${id}`} 
          passHref
        >
          <Box>
            <Box 
              width={widthBox}
              height={heightBox}
              boxShadow="md"
              transition="0.25s"
              opacity={!isHover ? '1' : '0.05'}
            >
              {poster_path ? (
                <Image
                  src={buildImageUrl(poster_path, 'w500')}
                  alt="Movie poster"
                  layout="responsive"
                  width={widthBox}
                  height={heightBox}
                  objectFit="cover"
                  unoptimized
                />
              ) : (
                <Box 
                  boxShadow="md" 
                  width={widthBox} 
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
            </Box>
            {poster_path && 
              <Box 
                pos="absolute" 
                bg="transparent" 
                height="100%" 
                width="100%" 
                top="0" 
                left="0" 
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
                  width="90%"
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