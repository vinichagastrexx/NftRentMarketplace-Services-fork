import React from 'react';
import PoolGrid from '../components/PoolGrid';
import useSWR from 'swr';
import { Container } from '@chakra-ui/react';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Pools() {
  const { data, error, isLoading } = useSWR('http://localhost:3001/pools/get-all', fetcher);
  if (error) return <div>{error}</div>

  return (
    <Container maxW={"75%"} p={5}>
      <PoolGrid isLoading={isLoading} data={data?.pools} />
    </Container>
  )
}