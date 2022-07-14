import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useSWR from 'swr';
import {
  Input,
  IconButton,
  Container,
  Spinner,
  Text,
  InputGroup,
  InputRightElement,
  VStack,
  Box,
  Wrap,
  Image,
  Flex,
  Stack,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import Layout from '../components/Layout';
import { buildImageUrl } from '../utils/api';

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
    <InputGroup as="form" onSubmit={handleSearch}>
      <Input
        placeholder="Search for a movie..."
        value={text}
        onChange={(event) => setText(event.target.value)}
        borderColor='green.600'
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
          bg='green.600'
          transition="0.25s"
          _hover={{
            transform: 'scale(1.2)',
            color: 'white'
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

  if (!terms) {
    return <Text>Type some terms and submit for a quick search</Text>;
  }
  if (error) {
    return (
      <Text color="red">
        Error fetching movies for {terms}: {JSON.stringify(error)}
      </Text>
    );
  }
  if (!data) {
    return <Spinner color='green.700' size="lg" isIndeterminate />;
  }
  if (!data.results.length) {
    return <Text>No results</Text>;
  }
  console.log(data)
  return (
    <Flex align="center" wrap="wrap" justify="space-around">
      {data.results.map(({ id, title, poster_path }) => (
        <Box key={id} boxShadow="md" bg="green.700" mx="3" my="6" borderRadius="lg" transition="0.25s" _hover={{
          cursor: 'pointer',
          transform: 'scale(1.1)'
        }}>
          <Link href={`/movies/${id}`} passHref>
            <Flex w="auto" direction="column" align="center" p="3">
              {poster_path && 
                <Box minW="200px">
                  <Image
                    src={buildImageUrl(poster_path, 'w200')}
                    alt="Movie poster"
                    layout="responsive"
                    width="200"
                    height="350"
                    objectFit="contain"
                    unoptimized
                    borderRadius="lg"
                    boxShadow="md"
                  />
                </Box>
              }
              <Text maxW="200" align="center" mt={poster_path ? "2" : '0'}>{title}</Text>
            </Flex>
          </Link>
        </Box>
      ))}
    </Flex>
  );
}

export default function Search() {
  return (
    <Layout title="Search">
      <Container>
        <VStack spacing={4} align="stretch">
          <SearchBar />
          <SearchResults />
        </VStack>
      </Container>
    </Layout>
  );
}
