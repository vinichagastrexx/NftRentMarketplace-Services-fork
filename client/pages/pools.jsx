import React from 'react';
import PoolGrid from '../components/Pool/PoolGrid';
import useSWR from 'swr';
import { Container } from '@chakra-ui/react';
import { URLS } from '../config/urls';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Pools() {
  const { data, error, isLoading } = useSWR(
    `${URLS.POOLS}/get-all`,
    fetcher,
  );
  if (error) return <div>{error.message}</div>;
  return (
    <Container maxW={'90%'} p={5}>
      <PoolGrid isLoading={isLoading} data={data?.pools} />
    </Container>
  );
}
