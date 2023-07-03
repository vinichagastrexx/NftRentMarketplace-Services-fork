import React, { useState } from 'react';
import { Box, Select, Container, Flex, Spacer, Text } from '@chakra-ui/react';
import PoolGrid from '../components/Pool/PoolGrid';
import useSWR from 'swr';
import { URLS } from '../config/urls';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const getGameName = (gameId) => {
  const gameNames = {
    1: 'Boom Boogers',
    2: 'Cursed Stone',
  };

  return gameNames[gameId];
};

const FilterBar = ({ gameIds, onFilterChange }) => {
  const handleFilterChange = (event) => {
    onFilterChange(event.target.value);
  };

  return (
    <Box w="30%" marginBottom="1em">
      <Flex alignItems="center" spacing={3}>
        <Text minWidth={150} fontSize={22} fontFamily={'Manrope'}>
          {' '}
          Filter by game{' '}
        </Text>
        <Select placeholder="Select game" onChange={handleFilterChange}>
          {gameIds.map((gameId) => (
            <option key={gameId} value={gameId}>
              {getGameName(gameId)}
            </option>
          ))}
        </Select>
      </Flex>
    </Box>
  );
};

export default function Pools() {
  const { data, error, isLoading } = useSWR(`${URLS.POOLS}/get-all`, fetcher);
  const [selectedGameId, setSelectedGameId] = useState(null);

  const handleFilterChange = (gameId) => {
    setSelectedGameId(gameId);
  };

  if (error) return <div>{error.message}</div>;
  const filteredPools = selectedGameId
    ? data?.pools.filter((pool) => pool.gameid === Number(selectedGameId))
    : data?.pools;

  const gameIds = [...new Set(data?.pools.map((pool) => pool.gameid))];

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
