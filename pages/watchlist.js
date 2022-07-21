import { Container, Center, Spinner, Heading } from '@chakra-ui/react';
import Layout from '../components/Layout';
import useSWR from 'swr';
import TextMessage from '../components/TextMessage';
import FlexMovies from '../components/FlexMovies';

const WatchlistContent = () => {
  const { data, error } = useSWR('/api/watchlist')

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
        message="You haven't added any movies to the viewing section!"
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

export default function Watchlist() {
  return (
    <Layout title="Watchlist">
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
            Your movies to watch
          </Heading>
        </Center>
        <WatchlistContent />
      </Container>
    </Layout>
  );
}
