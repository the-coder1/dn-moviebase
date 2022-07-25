import { Box, Center, Container, Flex, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';
import Layout from '../components/Layout';

const GenresContent = () => {
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
  
  return (
    <Flex 
      wrap="wrap"
      align="center"
      justify="center"
    >
      {genres.map(({ title, id }) => (
        <Link
          key={id}
          _hover={{ textDecoration: 'none' }} 
          href={`/genres/${id}?page=1`}
          passHref
        >
          <Box
            key={id} 
            bg="teal.700"
            boxShadow="md" 
            m={[1, , 2]} 
            width={['125px', , '150px']}
            height={['62.5px', , '75px']}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="sm" 
            transition="0.25s" 
            _hover={{
              cursor: 'pointer',
              transform: 'scale(1.05)',
              backgroundColor: "teal.900" 
            }}
          >
              <Text fontWeight="600">{title}</Text>
          </Box>
        </Link>
      ))}
    </Flex>
  )
}

export default function Genres() {
  return (
    <Layout title="Genres">
      <Container>
        <Center>
          <Heading
            as="h2" 
            size="lg" 
            borderBottom="2px" 
            borderColor="teal.500" 
            p="2"
            my='10'
          >
            Choose your genre
          </Heading>
        </Center>
        <GenresContent />
      </Container>
    </Layout>
  );
}
