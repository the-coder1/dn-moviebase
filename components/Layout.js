import Head from 'next/head';
import Link from 'next/link';
import {
  Box,
  Heading,
  Button,
  Container,
  useDisclosure,
  HStack,
  Stack,
  Spacer,
  VStack,
  Grid,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const MenuItem = ({ href, children, ...props }) => (
  <Link href={href} passHref>
    <Button 
      color="white" 
      as="a" 
      variant="link" 
      p="3"
      transition="0.25s"
      {...props} 
      _hover={{
        textDecoration: 'none',
        color: 'green.700',
        backgroundColor: 'white',
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
    <Box bg="green.700">
      <Container>
        <Stack
          as="nav"
          direction={['column', , 'row']}
          justify="space-between"
          wrap="wrap"
          py="0.5rem"
        >
          <HStack justify="space-between">
            <MenuItem href="/" mr={8}>
              <Heading size="lg">Moviebase</Heading>
            </MenuItem>

            <Box display={['block', , 'none']} onClick={onToggle}>
              <Button 
                variant="outline"
                p="2"
                _focus={{
                  outline: 'none'
                }} 
                _hover={{
                  color: 'green.700',
                  backgroundColor: 'white',
                  boxShadow: 'md'
                }}
              >
                <HamburgerIcon w='6' h="6" />
              </Button>
            </Box>
          </HStack>

          <Stack
            direction={['column', , 'row']}
            justify="start"
            align={['start', , 'center']}
            display={[isOpen ? 'flex' : 'none', , 'flex']}
            spacing={4}
          >
            <MenuItem href="/search">Search</MenuItem>
            <MenuItem href="/watchlist">
              Watchlist
            </MenuItem>
            <MenuItem href="/history">
              History
            </MenuItem>
          </Stack>

          <Spacer />

          <Stack
            direction={['column', , 'row']}
            justify="start"
            align={['start', , 'center']}
            display={[isOpen ? 'flex' : 'none', , 'flex']}
          >
            <MenuItem href="/" variant="outline">
              What to watch
            </MenuItem>
          </Stack>
        </Stack>
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
