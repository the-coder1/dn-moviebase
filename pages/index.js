import { Center, Container, Spinner } from '@chakra-ui/react';
import Layout from '../components/Layout';
import useSWR from 'swr';
import FirstMovies from '../components/FirstMovies';
import TextMessage from '../components/TextMessage';
import ContainerContent from '../components/ContainerContent';


const WatchMovies = () => {
  const { data, error } = useSWR('/api/watchlist')

  if(error) {
    return (
      <ContainerContent 
        message="Movies to watch"
        content={
          <TextMessage 
            statusAlert="error"
            startSlide={error} 
            message={`Error fetching movies: ${JSON.stringify(error)}`} 
          />
        }
      />
    )
  }

  if(!data) {
    return (
      <ContainerContent 
        message="Movies to watch"
        content={
          <Center height="200px">
            <Spinner 
              color='teal.500' 
              size='xl' 
              thickness='3px' 
              emptyColor='gray.200' 
              speed='0.5s' 
            />
          </Center>
        }
      />
    )
  }

  if(!data.length){
    return (
      <ContainerContent 
        message="Movies to watch"
        content={
          <TextMessage
            statusAlert="info"
            startSlide={!data.length}
            message="You haven't added any movies to the viewing section!"
          />
        }
      />
    )
  }

  return (
    <ContainerContent 
      message="Movies to watch"
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

const HistoryMovies = () => {
  const { data, error } = useSWR('/api/history')

  if(error) {
    return (
      <ContainerContent 
        message="Movies watched"
        content={
          <TextMessage 
            statusAlert="error"
            startSlide={error} 
            message={`Error fetching movies: ${JSON.stringify(error)}`} 
          />
        }
      />
    )
  }

  if(!data) {
    return (
      <ContainerContent 
        message="Movies watched"
        content={
          <Center height="200px">
            <Spinner 
              color='teal.500' 
              size='xl' 
              thickness='3px' 
              emptyColor='gray.200' 
              speed='0.5s' 
            />
          </Center>
        }
      />
    )
  }

  if(!data.length){
    return (
      <ContainerContent 
        message="Movies watched"
        content={
          <TextMessage
            statusAlert="info"
            startSlide={!data.length}
            message="You haven't added any movies to the history section!"
          />
        }
      />
    )
  }

  return (
    <ContainerContent 
      message="Watched movies"
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

const PopularMovies = () => {
  const { data, error } = useSWR('/api')

  if(error) {
    return (
      <ContainerContent 
        message="Popular movies"
        content={
          <TextMessage 
            statusAlert="error"
            startSlide={error} 
            message={`Error fetching movies: ${JSON.stringify(error)}`} 
          />
        }
      />
    )
  }

  if(!data) {
    return (
      <ContainerContent 
        message="Popular movies"
        content={
          <Center height="200px">
            <Spinner 
              color='teal.500' 
              size='xl' 
              thickness='3px' 
              emptyColor='gray.200' 
              speed='0.5s' 
            />
          </Center>
        }
      />
    )
  }

  if(!data.results.length){
    return (
      <ContainerContent 
        message="Popular movies"
        content={
          <TextMessage
            statusAlert="info"
            startSlide={!data.length}
            message="No popular movies"
          />
        }
      />
    )
  }

  return (
    <ContainerContent 
      message="Popular movies"
      content={
        <FirstMovies
          numberMovies="20"
          wrapMovies="wrap"
          alignMovies="center"
          justifyMovies="center"
          dataMovies={data.results} 
          widthMovies='200px'
          heightMovies="300px"
        />
      }
    />
  )
}

export default function Home() {
  return (
    <Layout title="Moviebase">
      <Container>
        <WatchMovies />
        <HistoryMovies />
        <PopularMovies />
      </Container>
    </Layout>
  );
}
