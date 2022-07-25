import { useRouter } from 'next/router';
import Image from "next/image"
import Head from 'next/head';
import useSWR from 'swr';
import { buildImageUrl } from '../../utils/api';
import {
  Box,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Spinner,
  Text
} from '@chakra-ui/react';
import Layout from '../../components/Layout';
import HistoryButton from '../../components/HistoryButton';
import WatchlistButton from '../../components/WatchlistButton';
import BadgeMovie from '../../components/BadgeMovie';
import TextMessage from '../../components/TextMessage';

const MovieContent = () => {
  const { id } = useRouter().query;
  const { data, error } = useSWR(id && `/api/movies/${id}`);
  console.log(data)

  if (error) {
    return (
      <TextMessage
        statusAlert="error"
        startSlide={error} 
        message={`Error fetching movie with ID ${id}: ${JSON.stringify(error)}`} 
      />
    );
  }

  if(!data){
    return (
      <Center height="400px">
        <Spinner 
          color='teal.500' 
          size='xl' 
          thickness='3px' 
          emptyColor='gray.200' 
          speed='0.5s' 
        />
      </Center>
    )
  }

  if (data.success === false) {
    return (
      <TextMessage
        statusAlert="error"
        startSlide={error} 
        message={data.status_message}
      />
    )
  }
  
  return (
    <Container>
      <Head>
        <title>{data.title}</title>
      </Head>

      <Flex 
        direction={["column", , , "row"]}
        align="center" 
        justify="space-between"
      >
        <Box 
          minW="300px" 
          pos="relative" 
          m="3"
          borderRadius="md"
        >
          <HStack 
            pos="absolute" 
            zIndex={1} 
            top={2} 
            right={2}
          >
            <HistoryButton />
            <WatchlistButton />
          </HStack>
          <HStack 
            pos="absolute" 
            zIndex={1} 
            top={2} 
            left={2}
          >
            <CircularProgress 
              value={data.vote_average * 10} 
              color='teal.500'
              thickness="5px"
              bg="gray.700"
              borderRadius="full"
            >
              <CircularProgressLabel>{data.vote_average.toFixed(1)}</CircularProgressLabel>
            </CircularProgress>
          </HStack>
          <Image
            src={buildImageUrl(data.poster_path, 'w500')}
            layout="responsive"
            width="300px"
            height="450px"
            unoptimized
          />
          {!data.poster_path && (
            <Flex
              width="300px"
              height="450px"
              borderRadius='md'
              bg="red"
              pos="absolute"
              top="0"
              left="0"
              align="center"
              justify="center"
            >
              <Text>{data.title}</Text>
            </Flex>
          )}
        </Box>
        <Box>
          <Box p="2">
            <Heading 
              as="h2" 
            >
              {data.title}
            </Heading>
            <Text mb="2">{data.tagline}</Text>
            <Box>
              <BadgeMovie 
                variantBadge="solid"
                content="Released: "
                colorBadge="black"
              />
              <BadgeMovie 
                variantBadge="outline"
                content={data.release_date ? data.release_date : 'N/A'}
                colorBadge="teal"
              />
              <BadgeMovie 
                variantBadge="solid"
                content="Status: "
                colorBadge="black"
              />
              <BadgeMovie 
                variantBadge="outline"
                content={data.status ? data.status : 'N/A'}
                colorBadge="teal"
              />
            </Box>
          </Box>

          <Divider />

          <Box p="2">
            <BadgeMovie
              variantBadge="solid"
              content="Overview: "
              colorBadge="black"
            />
            <Text p="2">{data.overview ? data.overview : 'N/A'}</Text>
          </Box>

          <Box p="2" direction="row" wrap="wrap" justify="start" align="start">
            <BadgeMovie
              variantBadge="solid"
              content="Genres: "
              colorBadge="black"
            />

            {data.genres.length === 0 && 
              <BadgeMovie
                variantBadge="outline"
                content="N/A"
                colorBadge="teal"
              />
            }
            {data.genres?.map((genre) => (
              <BadgeMovie
                key={genre.id}
                variantBadge="outline"
                content={genre.name}
                colorBadge="teal"
              />
            ))}
          </Box>
          
          <Box p="2" h="auto" direction="row">
            <BadgeMovie
              variantBadge="solid"
              content="Companies: "
              colorBadge="black"
            />

            {data.production_companies.length === 0 &&
              <BadgeMovie
                variantBadge="outline"
                content="N/A"
                colorBadge="teal"
              />
            }
            {data.production_companies?.map((company) => (
              <BadgeMovie
                key={company.id}
                variantBadge="outline"
                content={company.name}
                colorBadge="teal"
              />
            ))}
          </Box>
        </Box>
      </Flex>
    </Container>
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
