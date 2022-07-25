import { Center, Container, Heading, Spinner, useMediaQuery } from '@chakra-ui/react';
import useSWR from 'swr';
import Layout from '../components/Layout';
import ContainerContent from '../components/ContainerContent';
import FirstMovies from '../components/FirstMovies';
import TextMessage from '../components/TextMessage';
import Carousel from '../components/Carousel';

const WatchlistContent = () => {
  const [extraSmallDevice] = useMediaQuery("(max-width: 600px)")
  const [smallDevice] = useMediaQuery("(max-width: 768px)")
  const [mediumDevice] = useMediaQuery("(max-width: 992px)")
  const [largeDevice] = useMediaQuery("(max-width: 1200px)")
  const [extraLargeDevice] = useMediaQuery("(min-width: 1200px)")

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
    <ContainerContent 
      message="Movies to watch"
      content={
        <Carousel
          dataMovies={data}
          showItems={
            extraSmallDevice ? "1" :
              smallDevice ? "1" :
              mediumDevice ? "3" :
              largeDevice ? "3" :
              extraLargeDevice && "5"
          }
          widthMovies="200px"
          heightMovies="300px"
        />
      }
    />
  )
}

const RandomMoviesContent = () => {
  const [extraSmallDevice] = useMediaQuery("(max-width: 600px)")
  const [smallDevice] = useMediaQuery("(max-width: 768px)")
  const [mediumDevice] = useMediaQuery("(max-width: 992px)")
  const [largeDevice] = useMediaQuery("(max-width: 1200px)")
  const [extraLargeDevice] = useMediaQuery("(min-width: 1200px)")

  const { data, error } = useSWR(`/api/what_to_watch`)
  console.log(data)
  
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
        startSlide={!data[0].length}
        message="You do not have any recommendation"
      />
    )
  }
  
  return (
    <>
      {data.map((item) => (
        <ContainerContent
          key={item.id}
          message={item ? `Recommand for you: ${item.title}` : 'Recommandation'}
          content={
            <Carousel
              dataMovies={item.movies.results} 
              showItems={
                extraSmallDevice ? "1" :
                  smallDevice ? "1" :
                  mediumDevice ? "3" :
                  largeDevice ? "3" :
                  extraLargeDevice && "5"
              }
              widthMovies="200px"
              heightMovies="300px"
            />
          }
        />
      ))}
    </>
  )
}

export default function WhatToWatch() {
  return (
    <Layout title="What to watch">
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
            Our recommendations
          </Heading>
        </Center>
        <WatchlistContent />
        <RandomMoviesContent />
      </Container>
    </Layout>
  );
}
