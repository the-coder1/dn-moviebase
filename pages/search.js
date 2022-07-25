import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import {
  Input,
  IconButton,
  Container,
  Spinner,
  InputGroup,
  InputRightElement,
  Center,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import Layout from '../components/Layout';
import TextMessage from '../components/TextMessage';
import FlexMovies from '../components/FlexMovies';

function SearchBar() {
  const router = useRouter();
  const { terms } = router.query;
  const [text, setText] = useState('');

  // Update text input when route changes (ex when user goes back/forward)
  useEffect(() => {
    setText(terms || '');
  }, [terms]);

  // Update router history if a search was performed
  const handleSearch = (event) => {
    event.preventDefault();
    if (text !== terms) {
      router.push(`/search/?terms=${text}`, undefined, { shallow: true });
    }
  };

  return (
    <InputGroup width={["100%", "85%", "65%", "45%"]} mb="3" mx="auto" as="form" onSubmit={handleSearch}>
      <Input
        placeholder="Search for a movie..."
        value={text}
        onChange={(event) => setText(event.target.value)}
        borderColor='teal.500'
        borderWidth="2px"
        borderRadius="md"
        boxShadow="md"
        _hover={{
          borderColor: 'gray.200'
        }}
        _focus={{
          outline: 'none'
        }}
      />
      <InputRightElement>
        <IconButton
          aria-label="Search for a movie"
          icon={<SearchIcon />}
          type="submit"
          color='black'
          bg='teal.500'
          boxShadow="md"
          borderRadius="md"
          transition="0.25s"
          _hover={{
            transform: 'scale(1.2)',
            color: 'gray.200'
          }}
          _focus={{
            outline: 'none'
          }}
        />
      </InputRightElement>
    </InputGroup>
  );
}
function SearchResults() {
  const { terms } = useRouter().query;
  const { data, error } = useSWR(terms && `/api/search?terms=${terms}`);

  if(!terms) {
    return (
      <TextMessage 
        statusAlert="warning"
        startSlide={!terms} 
        message="Type some terms and submit for a quick search"
      />
    )
  }

  if (error) {
    return (
      <TextMessage 
        statusAlert="error"
        startSlide={error} 
        message={`Error fetching movies for ${terms}: ${JSON.stringify(error)}`} 
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

  if (!data.results.length) {
    return (
      <TextMessage
        statusAlert="info"
        startSlide={!data.results.length}
        message="No results!"
      />
    )
  }

  return (
    <FlexMovies
      wrapMovies="wrap"
      alignMovies="center"
      justifyMovies="center"
      dataMovies={data.results}
      widthMovies="200px"
      heightMovies="300px"
    />
  );
}

export default function Search() {
  return (
    <Layout title="Search">
      <Container>          
        <SearchBar />
        <SearchResults />
      </Container>
    </Layout>
  );
}
