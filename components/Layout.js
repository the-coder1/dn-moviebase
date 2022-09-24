import Head from 'next/head';
import Link from 'next/link';
import {
  Box,
  Heading,
  Button,
  Container,
  useDisclosure,
  Spacer,
  VStack,
  Grid,
  Text,
  Flex,
  ColorModeScript,
  theme,
} from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon, QuestionOutlineIcon } from '@chakra-ui/icons';

const MenuItem = ({ href, children, ...props }) => (
  <Link href={href} passHref>
    <Button 
      color="gray.200" 
      as="a" 
      variant="link" 
      p="3"
      borderRadius="sm"
      transition="0.25s"
      {...props} 
      _hover={{
        textDecoration: 'none',
        backgroundColor: "teal.800",
        boxShadow: 'md'
      }}
      _focus={{
        outline: 'none'
      }}
      >
      {children}
    </Button>
  </Link>
);

function Header() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box 
      bg="teal.700" 
      borderRadius="sm" 
      boxShadow="md"
    >
      <Container>
        <Flex
          direction={['column', , 'row']}
          as="nav"
          p="2"
        >
          <Flex
            align="center"
            justify="space-between"
          >
            <MenuItem href="/" mr={8}>
              <Heading size="lg">Moviebase</Heading>
            </MenuItem>

            <Box
              display={['flex', , 'none']}
              onClick={onToggle}
            >
              <Button
                variant=""
                p="3"
                borderRadius="sm"
                _focus={{
                  outline: 'none'
                }} 
                _hover={{
                  backgroundColor: 'teal.800',
                  boxShadow: 'md'
                }}
              >
                {isOpen ? (<CloseIcon w='4' h="4" />) : (<HamburgerIcon w='6' h="6" />)}
              </Button>
            </Box>
          </Flex>

          <Box
            display={[isOpen ? 'flex' : 'none', , 'flex']}
            flexDirection={['column', , 'row']}
            alignItems={['start', , 'center']}
          >
            <MenuItem href="/search">Search</MenuItem>
            <MenuItem href="/genres">
              Genres
            </MenuItem>
            <MenuItem href="/watchlist">
              Watchlist
            </MenuItem>
            <MenuItem href="/history">
              History
            </MenuItem>
          </Box>

          <Spacer />

          <Box
            display={[isOpen ? 'flex' : 'none', , 'flex']}
            alignItems="center"
          >
            <MenuItem href="/what_to_watch" display="flex" alignItems="center">
              <Text>What to watch</Text> 
              <QuestionOutlineIcon ml="2" w='6' h="6" />
            </MenuItem>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        {title && <title>{title}</title>}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid minH="100vh">
        <VStack w="full" align="stretch" spacing={8}>
          <Header />
          <Box as="main" h="full">
            {children}
          </Box>
        </VStack>
      </Grid>
    </>
  );
}
