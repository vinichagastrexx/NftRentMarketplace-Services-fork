import { SimpleGrid, Skeleton, Link, Text } from "@chakra-ui/react";
import PoolCard from "./PoolCard";

export default function PoolGrid({
  isLoading,
  data,
  overrideOnclickBehaviour,
  emptyText = "No pools found"
}) {
  return (
    <SimpleGrid columns={4} spacing={6} maxW={"75%"} padding={2.5} my={5}>
      {isLoading ? (
        [...Array(12)].map((_, index) => (
          <Skeleton key={index} height={"312px"} width={"100%"} />
        ))
      ) : data && data.length > 0 ? (
        data.map((pool) => !overrideOnclickBehaviour ? (
          <Link href={`/pool/${pool.id}`} key={pool.id}>
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
