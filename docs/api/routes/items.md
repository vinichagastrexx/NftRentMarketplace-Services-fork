## Items Routes

- `POST /items/create-item`

  This endpoint register a new item in the database. The user needs to provide details about the item, including the NFT ID, category ID, and owner's Ethereum address.

  **Body:**
  ```
  {
    "nftId": "<nft_id>",
    "categoryId": "<category_id>",
    "owner": "<owner_address>"
  }
  ```

- `POST /items/add-to-pool/:nftId`

  This endpoint adds an item to the pool of available items for rent. The item is identified by its NFT ID.

  **Parameters:**
  - `nftId`: The ID of the NFT.

  **Example:**
  ```
  POST /items/add-to-pool/123
  ```

- `GET /items/get-in-pool/:owner`

  This endpoint retrieves all items owned by a specific user that are currently in the pool and available for rent.

  **Parameters:**
  - `owner`: The Wallet address of the owner.

  **Example:**
  ```
  GET /items/get-in-pool/0x1234abcd...
  ```

- `GET /items/get-rented/:owner`

  This endpoint retrieves all items owned by a specific user that are currently rented out to others.

  **Parameters:**
  - `owner`: The Wallet address of the owner.

  **Example:**
  ```
  GET /items/get-rented/0x1234abcd...
  ```

- `GET /items/get-owned/:owner`

  This endpoint retrieves all items owned by a specific user, regardless of their rental status.

  **Parameters:**
  - `owner`: The Wallet address of the owner.

  **Example:**
  ```
  GET /items/get-owned/0x1234abcd...
  ```

Please note that all Ethereum addresses should be provided as hexadecimal strings.