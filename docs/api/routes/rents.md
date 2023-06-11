## Rents Routes

- `POST /rents/start-rent`

  This endpoint initiates a new rent transaction. The user needs to provide details about the rent, including the NFT ID, pool ID, rentee, price, and expiration date.

  **Body:**
  ```
  {
    "rentId": "<rent_id>",
    "nftId": "<nft_id>",
    "poolId": "<pool_id>",
    "owner": "<owner>",
    "rentee": "<rentee_address>",
    "price": "<rent_price>",
    "initDate": "<init_date>,
    "expirationDate": "<expiration_date>"
  }
  ```

- `GET /rents/get-active-by-rentee/:rentee`

  This endpoint retrieves all active rents for a specific rentee. An active rent is a rent that has been started but not yet finished.

  **Parameters:**
  - `rentee`: The wallet address of the rentee.

  **Example:**
  ```
  GET /rents/get-active-by-rentee/0x1234abcd...
  ```

- `GET /rents/get-all-by-rentee/:rentee`

  This endpoint retrieves all rents (both active and finished) for a specific rentee.

  **Parameters:**
  - `rentee`: The Wallet address of the rentee.

  **Example:**
  ```
  GET /rents/get-all-by-rentee/0x1234abcd...
  ```

- `POST /rents/finish-rent`

  This endpoint finishes an active rent. The user needs to provide the rent ID and the finish date.

  **Body:**
  ```
  {
    "rentId": "<rent_id>",
    "finishDate": "<finish_date>"
  }
  ```