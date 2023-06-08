
const resourceId = "TREXXGG.RENTS"
const transactionVolumeQuery = "SELECT COUNT(*)\n" +
  "FROM TREXXGG.RENTS\n" +
  "WHERE TREXXGG.RENTS.INITDATE >= NOW() - INTERVAL 1 DAY \n";

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

const transactionVolume = arrayResponse[0];
const referenceVolume = 100; // 100 transactions per day for the last day
let newMarketVolumeFactor = 0;
let volumeRatio = 0;


if (transactionVolume > 0) {
  volumeRatio = transactionVolume / referenceVolume;
  if (volumeRatio > 1) {
    newMarketVolumeFactor = 1 + volumeRatio;
  } else if (volumeRatio < 1) {
    newMarketVolumeFactor = 1 - volumeRatio;
  }
} else {
  newMarketVolumeFactor = 1;
}


console.log("Value we'll send on-chain:", newMarketVolumeFactor);
return Functions.encodeUint256(newMarketVolumeFactor);