const response = await Functions.makeHttpRequest({
  url: "https://nbgkttqq4f.execute-api.us-east-2.amazonaws.com/dev/rents/get-last-day",
  method: "GET",
  timeout: 9000
})

const lastDayRents = response.data.lastDayRents

const transactionVolume = lastDayRents;
const referenceVolume = 100; // 100 transactions per day for the last day
let newMarketVolumeFactor = 0;
let volumeRatio = 0;

if (transactionVolume > 0) {
  volumeRatio = transactionVolume / referenceVolume;
  if (volumeRatio > 1) {
    newMarketVolumeFactor = 1 + (1 / volumeRatio) * 100;
  } else if (volumeRatio < 1) {
    newMarketVolumeFactor = 1 - (1 / volumeRatio) / 100;
  }
} else {
  newMarketVolumeFactor = 1;
}

console.log("Value we'll send on-chain:", newMarketVolumeFactor);
return Functions.encodeUint256(parseInt(newMarketVolumeFactor * 10 ** 18));