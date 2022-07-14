import { Center, Box, Link, Flex, Image, Text, Skeleton } from '@chakra-ui/react';
import Layout from '../components/Layout';
import useSWR from 'swr';
import { buildImageUrl } from '../utils/api';

const HistoryContent = () => {
  return (
    <Box>History</Box>
  )
}

export default function Home() {
  return (
    <Layout title="Moviebase">
      <Center h="full">
        <HistoryContent />
      </Center>
    </Layout>
  );
}
