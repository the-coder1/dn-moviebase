import { Center, Box, Link, Flex, Image, Text, Skeleton } from '@chakra-ui/react';
import Layout from '../components/Layout';
import useSWR from 'swr';
import { buildImageUrl } from '../utils/api';

const WatchlistContent = () => {
  return (
    <Box>Watchlist</Box>
  )
}

export default function Home() {
  return (
    <Layout title="Moviebase">
      <Center h="full">
        <WatchlistContent />
      </Center>
    </Layout>
  );
}
