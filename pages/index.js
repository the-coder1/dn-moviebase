import { Center, Box, Link, Flex, Image, Text, Skeleton } from '@chakra-ui/react';
import Layout from '../components/Layout';
import useSWR from 'swr';
import { buildImageUrl } from '../utils/api';

const MoviesContent = () => {
  const { data, error } = useSWR('/api')

  if (error) {
    return (
      <Text color="red">
        Error fetching movies: {JSON.stringify(error)}
      </Text>
    );
  }
  if(!data){
    return <Skeleton width="300px" height="450px" m="3"></Skeleton>
  }
  if (data.success === false) {
    return <Text color="red">{data.status_message}</Text>;
  }

  return (
    <Flex align="center" wrap="wrap" justify="space-around">
      {data.results.map(({ id, title, poster_path }) => (
        <Box key={id} boxShadow="md" bg="green.700" mx="3" my="6" borderRadius="lg" transition="0.25s" _hover={{
          cursor: 'pointer',
          transform: 'scale(1.1)'
        }}>
          <Link _hover={{ textDecoration: 'none' }} href={`/movies/${id}`} passHref>
            <Flex w="auto" direction="column" align="center" p="3">
              {poster_path && 
                <Box minW="200px">
                  <Image
                    src={buildImageUrl(poster_path, 'w200')}
                    alt="Movie poster"
                    layout="responsive"
                    width="200"
                    height="350"
                    objectFit="contain"
                    unoptimized
                    borderRadius="lg"
                    boxShadow="md"
                  />
                </Box>
              }
              <Text maxW="200" align="center" mt={poster_path ? "2" : '0'}>{title}</Text>
            </Flex>
          </Link>
        </Box>
      ))}
    </Flex>
  )
}

export default function Home() {
  return (
    <Layout title="Moviebase">
      <Center h="full">
        <MoviesContent />
      </Center>
    </Layout>
  );
}
