import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useSWR, { useSWRConfig } from 'swr';
import { fetcher } from '../utils/api';

export default function WatchlistButton() {
  const { id } = useRouter().query;
  const { data: watchlist } = useSWR(`/api/watchlist/${id}`);
  const { data: history } = useSWR(`/api/history/${id}`);
  const { mutate } = useSWRConfig();

  return (
    <Tooltip label={watchlist?.found ? 'Remove from watchlist' : 'Add to watchlist'}>
      <IconButton
        _focus={{
          outline: 'none'
        }}
        isLoading={!watchlist}
        colorScheme={watchlist?.found ? 'teal' : 'gray'}
        size="md"
        boxShadow="md"
        borderRadius="md"
        onClick={() => {
          mutate(`/api/watchlist/${id}`, () =>
            fetcher(`/api/watchlist/${id}`, {
              method: watchlist?.found ? 'DELETE' : 'PUT',
            })
          );
        }}
        isDisabled={history?.found}
      >
        {watchlist?.found ? 
          <ViewIcon color={watchlist?.found ? 'white' : 'black'} /> :
          <ViewOffIcon color={watchlist?.found ? 'white' : 'black'} />
        }
      </IconButton>
    </Tooltip>
  );
}
