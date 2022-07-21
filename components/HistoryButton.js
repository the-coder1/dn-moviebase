import { CalendarIcon } from '@chakra-ui/icons';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useSWR, { useSWRConfig } from 'swr';
import { fetcher } from '../utils/api';

export default function HistoryButton() {
  const { id } = useRouter().query;
  const { data: history } = useSWR(`/api/history/${id}`);
  const { mutate } = useSWRConfig();

  return (
    <Tooltip label={history?.found ? 'Remove from history' : 'Add to history'}>
      <IconButton
        _focus={{
          outline: 'none'
        }}
        isLoading={!history}
        colorScheme={history?.found ? 'teal' : 'gray'}
        size="md"
        boxShadow="md"
        borderRadius="md"
        onClick={() => {
          mutate(`/api/history/${id}`, () =>
            fetcher(`/api/history/${id}`, {
              method: history.found ? 'DELETE' : 'PUT',
            })
          );
        }}

      >
        <CalendarIcon color={history?.found ? 'white' : 'black'} />
      </IconButton>
    </Tooltip>
  );
}
