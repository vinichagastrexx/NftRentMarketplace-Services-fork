## Pools Routes

- `GET /pools/get-all`

  This endpoint retrieves all the pools available in the marketplace. A pool is a collection of items (NFTs) of the same category that are available for rent.

  **Example:**
  ```
  GET /pools/get-all
  ```

- `GET /pools/:poolId`

  This endpoint retrieves a specific pool by its ID. The pool ID is a unique identifier assigned to each pool.

  **Parameters:**
  - `poolId`: The ID of the pool.

  **Example:**
  ```
  GET /pools/123
  ```

- `POST /pools/create-pool`

  This endpoint creates a new pool in the marketplace. The user needs to provide the pool ID and the base price for renting items from this pool.

  **Body:**
  ```
  {
    "poolId": "<pool_id>",
    "basePrice": "<base_price>"
  }
  ```

Please note that all prices should be provided as integer numbers.