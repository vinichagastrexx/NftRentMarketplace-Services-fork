
const resourceId = "MUMBAI2.TRANSACTIONS"
const transactionVolumeQuery = "SELECT COUNT(*) \n" +
  "FROM MUMBAI2.TRANSACTIONS \n" +
  "WHERE MUMBAI2.TRANSACTIONS.TO_ADDRESS = '0x7A810cB14b16Fb68B6c64766865B5090d80a8Ff0' \n" +
  "AND MUMBAI2.TRANSACTIONS.VALUE_ > '0' \n" +
  "AND MUMBAI2.TRANSACTIONS.TIME_STAMP >= NOW() - INTERVAL 30 DAY \n";


const response = await Functions.makeHttpRequest({
  url: "https://hackathon.spaceandtime.dev/v1/sql/dql",
  method: "POST",
  timeout: 9000,
  headers: {
    'Authorization': `Bearer ${secrets.accessToken}`,
    "Content-Type": "application/json"
  },
  data: { "resourceId": resourceId, "sqlText": transactionVolumeQuery }
})
const responseData = response.data
const arrayResponse = Object.keys(responseData[0]).map((key) => `${responseData[0][key]}`);

console.log("Full response from SxT API:", response)
console.log("Value we'll send on-chain:", parseInt(arrayResponse[0]));

const transactionVolume = arrayResponse[0];
const referenceVolume = 1000; // 100 transactions per day for the last 10 days

//must be a number between 0 and 100;
let volumeRatio = transactionVolume / referenceVolume;

console.log("Marketplace Volume Factor:", volumeRatio);
return Functions.encodeUint256(parseInt(volumeRatio, 10));