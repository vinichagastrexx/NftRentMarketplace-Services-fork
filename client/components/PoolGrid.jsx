import { SimpleGrid, Skeleton, Link, Text } from "@chakra-ui/react";
import PoolCard from "./PoolCard";

export default function PoolGrid({
  isLoading,
  data,
  overrideOnclickBehaviour,
  emptyText = "No pools found"
}) {
  return (
    <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} spacing={'40px'} maxW={"1280px"} padding={2.5} my={5}>
      {isLoading ? (
        [...Array(12)].map((_, index) => (
          <Skeleton key={index} height={"312px"} width={"100%"} />
        ))
      ) : data && data.length > 0 ? (
        data.map((pool) => !overrideOnclickBehaviour ? (
          <Link href={`/pool/${pool.ID}`} key={pool.ID}>
            <PoolCard pool={pool}></PoolCard>
          </Link>
        ) : (
          <div key={pool.id} onClick={() => overrideOnclickBehaviour(pool)}>
            <PoolCard pool={pool}></PoolCard>
          </div>
        ))
      ) : (
        <Text>{emptyText}</Text>
      )}
    </SimpleGrid>
  )
}
