import { Box, Select, Flex, Text } from '@chakra-ui/react';

function FilterBar({ gameIds, onFilterChange }) {
  const handleFilterChange = (event) => {
    onFilterChange(event.target.value);
  };

  const getGameName = (gameId) => {
  const gameNames = {
    1: 'Boom Boogers',
    2: 'Cursed Stone',
  };

  return gameNames[gameId];
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

export default FilterBar