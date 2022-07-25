import { Center, Container, Spinner, useMediaQuery } from '@chakra-ui/react';
import Layout from '../components/Layout';
import useSWR from 'swr';
import FirstMovies from '../components/FirstMovies';
import TextMessage from '../components/TextMessage';
import ContainerContent from '../components/ContainerContent';
import Carousel from '../components/Carousel';


const WatchMovies = () => {
  const [extraSmallDevice] = useMediaQuery("(max-width: 600px)")
  const [smallDevice] = useMediaQuery("(max-width: 768px)")
  const [mediumDevice] = useMediaQuery("(max-width: 992px)")
  const [largeDevice] = useMediaQuery("(max-width: 1200px)")
  const [extraLargeDevice] = useMediaQuery("(min-width: 1200px)")

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

const HistoryMovies = () => {
  const [extraSmallDevice] = useMediaQuery("(max-width: 600px)")
  const [smallDevice] = useMediaQuery("(max-width: 768px)")
  const [mediumDevice] = useMediaQuery("(max-width: 992px)")
  const [largeDevice] = useMediaQuery("(max-width: 1200px)")
  const [extraLargeDevice] = useMediaQuery("(min-width: 1200px)")

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

const PopularMovies = () => {
  const [extraSmallDevice] = useMediaQuery("(max-width: 600px)")
  const [smallDevice] = useMediaQuery("(max-width: 768px)")
  const [mediumDevice] = useMediaQuery("(max-width: 992px)")
  const [largeDevice] = useMediaQuery("(max-width: 1200px)")
  const [extraLargeDevice] = useMediaQuery("(min-width: 1200px)")

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
      message="Movies to watch"
      content={
        <Carousel
          dataMovies={data.results}
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
