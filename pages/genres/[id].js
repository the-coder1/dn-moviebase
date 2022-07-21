import { useRouter } from 'next/router';
import Head from 'next/head';
import useSWR from 'swr';
import {
  Center,
  Container,
  Spinner,
} from '@chakra-ui/react';
import Layout from '../../components/Layout';
import TextMessage from '../../components/TextMessage';
import FlexMovies from '../../components/FlexMovies';
import Pagination from '../../components/Pagination';

const MovieContent = () => {
  const { id, page } = useRouter().query;
  const { data, error } = useSWR(id && `/api/genres/${id}?page=${page}`);

  if (error) {
    return (
      <TextMessage
        statusAlert="error"
        startSlide={error} 
        message={`Error fetching movies: ${JSON.stringify(error)}`} 
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

  if (data.results.success === false) {
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
        <title>
          Movies
        </title>
      </Head>

      <FlexMovies
        wrapMovies="wrap"
        alignMovies="center"
        justifyMovies="center"
        dataMovies={data.results}
        widthMovies="200px"
        heightMovies="300px"
      />
      <Pagination
        id={id}
        dataMovies={data}
        pageMovies={page}
        distancePages="2"
      />
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
