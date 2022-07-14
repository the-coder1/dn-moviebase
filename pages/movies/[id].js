import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import useSWR from 'swr';
import { buildImageUrl } from '../../utils/api';
import {
  Badge,
  Box,
  Container,
  Divider,
  Heading,
  HStack,
  Spinner,
  Stack,
  Text,
  Skeleton,
  SkeletonText
} from '@chakra-ui/react';
import Layout from '../../components/Layout';
import HistoryButton from '../../components/HistoryButton';
import WatchlistButton from '../../components/WatchlistButton';

const MovieContent = () => {
  const { id } = useRouter().query;
  const { data, error } = useSWR(id && `/api/movies/${id}`);

  if (error) {
    return (
      <Text color="red">
        Error fetching movie with ID {id}: {JSON.stringify(error)}
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
    <Stack direction={['column', 'row']} spacing={4}>
      <Head>
        <title>{data.title}</title>
      </Head>

      <Box minW="300px" pos="relative" m="3">
        <HStack pos="absolute" zIndex={1} top={2} right={2}>
          <HistoryButton />
          <WatchlistButton />
        </HStack>
        <HStack pos="absolute" zIndex={1} top={2} left={2}>
          <Box bg="green.700" p="2" borderRadius="5" boxShadow="md">Vote: {data.vote_average ? data.vote_average : 'N/A'}</Box>
        </HStack>
        <Image
          src={buildImageUrl(data.poster_path, 'w300')}
          alt="Movie poster"
          layout="responsive"
          width="300"
          height="450"
          objectFit="contain"
          unoptimized
        />
      </Box>

      <Stack>
        <Stack p="3" direction="column">
          <Heading as="h2" pb="2">{data.title}</Heading>
          <Box>
            <Badge colorScheme="green" variant="solid" p="2" borderRadius="5" color="black" me="2">Released: </Badge>
            <Badge colorScheme="green" variant="outline" p="2" borderRadius="5">{data.release_date ? data.release_date : 'N/A'}</Badge>
          </Box>
        </Stack>
        <Divider />

        <Stack p="2">
          <Badge colorScheme="green" variant="solid" p="2" borderRadius="5" color="black">Overview: </Badge>
          <Text p="2">{data.overview ? data.overview : 'N/A'}</Text>
        </Stack>

        <Stack p="2" direction="row" wrap="wrap" justify="start" align="start">
          <Badge colorScheme="green" variant="solid" p="2" borderRadius="5" color="black">Genres: </Badge>

          {data.genres.length === 0 && 
            <Badge colorScheme="green" p="2" borderRadius="5" variant="outline">N/A</Badge>
          }
          {data.genres?.map((genre) => (
            <Badge key={genre.id} colorScheme="green" p="2" borderRadius="5" variant="outline">
              {genre.name}
            </Badge>
          ))}
        </Stack>
        
        <Stack p="2" h="auto" direction="row">
          <Badge colorScheme="green" variant="solid" p="2" borderRadius="5" color="black">Companies: </Badge>

          {data.production_companies.length === 0 &&
            <Badge colorScheme="green" variant="outline" p="2" borderRadius="5">N/A</Badge>
          }
          {data.production_companies?.map((company) => (
            <Badge key={company.id} colorScheme="green" p="2" m="2" borderRadius="5" variant="outline">
              {company.name}
            </Badge>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default function Movie() {
  return (
    <Layout>
      <Container h="full">
        <MovieContent />
      </Container>
    </Layout>
  );
}
