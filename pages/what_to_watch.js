import { Center, Container, Heading, Spinner } from '@chakra-ui/react';
import useSWR from 'swr';
import Layout from '../components/Layout';
import ContainerContent from '../components/ContainerContent';
import FirstMovies from '../components/FirstMovies';
import TextMessage from '../components/TextMessage';

const WatchlistContent = () => {
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
        message="You haven't added any movies to the viewing section!"
      />
    )
  }
  
  return (
    <ContainerContent 
      message="Your movies to watch"
      content={
        <FirstMovies
          wrapMovies="nowrap"
          alignMovies="center"
          justifyMovies="start"
          dataMovies={data} 
          widthMovies="200px"
          heightMovies="300px"
        />
      }
    />
  )
}

const VotedMoviesContent = () => {
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
        startSlide={!data.length}
        message="You haven't added any movies to the viewing section!"
      />
    )
  }
  
  return (
    <ContainerContent 
      message="Most voted movies"
      content={
        <FirstMovies
          wrapMovies="wrap"
          alignMovies="center"
          justifyMovies="start"
          dataMovies={data} 
          widthMovies="200px"
          heightMovies="300px"
          numberMovies="20"
        />
      }
    />
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
        <VotedMoviesContent />
      </Container>
    </Layout>
  );
}
