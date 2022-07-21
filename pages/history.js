import { Container, Center, Flex, Spinner, Heading } from '@chakra-ui/react';
import useSWR from 'swr';
import BoxMovieModel from '../components/BoxMovieModel';
import FlexMovies from '../components/FlexMovies';
import Layout from '../components/Layout';
import TextMessage from '../components/TextMessage';

const HistoryContent = () => {
  const { data, error } = useSWR('/api/history')

  if (error) {
    return (
      <TextMessage 
        status="error"
        startSlide={error} 
        message={`Error fetching movies: ${JSON.stringify(error)}`} 
      />
    )
  }

  if(!data){
    return (
      <Center height="200px">
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

  if (!data.length) {
    return (
      <TextMessage
        status="info"
        startSlide={!data.length}
        message="You haven't added any movies to the history section!"
      />
    )
  }
  
  return (
    <FlexMovies
      wrapMovies="wrap"
      alignMovies="center"
      justifyMovies="center"
      dataMovies={data}
      widthMovies="200px"
      heightMovies="300px"
    />
  )
}

export default function History() {
  return (
    <Layout title="History">
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
            Your watched movies
          </Heading>
        </Center>
        <HistoryContent />
      </Container>
    </Layout>
  );
}
