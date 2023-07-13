import React, { useState } from 'react';
import { Box, Select, Container, Flex, Spacer, Text } from '@chakra-ui/react';
import PoolGrid from '../components/Pool/PoolGrid';
import useSWR from 'swr';
import { URLS } from '../config/urls';
import FilterBar from '../components/FilterBar';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Pools() {
  const { data, error, isLoading } = useSWR(`${URLS.POOLS}/get-all`, fetcher);
  const [selectedGameId, setSelectedGameId] = useState(null);

  const handleFilterChange = (gameId) => {
    setSelectedGameId(gameId);
  };

  if (error) return <div>{error.message}</div>;
  const filteredPools = selectedGameId
    ? data?.pools.filter((pool) => pool.gameId === Number(selectedGameId))
    : data?.pools;

  const gameIds = [...new Set(data?.pools.map((pool) => pool.gameId))];

  return (
    <Container maxW={'90%'} p={5}>
      <Flex>
        <Spacer />
        <FilterBar gameIds={gameIds} onFilterChange={handleFilterChange} />
      </Flex>
      <PoolGrid isLoading={isLoading} data={filteredPools} />
    </Container>
  );
}
