const env = require("../config/env")
const axios = require('axios');
const nacl = require("tweetnacl");

const api_url = env.sxtURL;


async function main() {
  const userId = env.sxtUserId;
  return await authenticate(userId);
}


async function authenticate(userId) {
  const authCode = await requestAuthCode(userId);
  const signedAuthCode = signMessage(authCode);
  const tokens = await requestToken(userId, authCode, signedAuthCode);
  return {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken
  }
}

async function requestAuthCode(userId) {
  const url = `${api_url}auth/code`;
  const payload = { userId, joinCode: env.sxtOrgCode };
  const response = await axios.post(url, payload);

  if (response.status !== 200) {
    // console.error('Non 200 response from the auth/code endpoint! Stopping.');s
    process.exit();
  }

  return response.data.authCode;
}

function signMessage(message) {
  let privateKeyUint = base64ToUint8(env.sxtPvKey, env.sxtPubKey);

  let authCode = new TextEncoder().encode(message);
  let signatureArray = nacl.sign(authCode, privateKeyUint);
  let signature = Buffer.from(signatureArray.buffer, signatureArray.byteOffset, signatureArray.byteLength).toString('hex');
  signature = signature.slice(0, 128);

  return signature;
}

async function requestToken(userId, authCode, signedAuthCode) {
  const url = `${api_url}auth/token`;
  const payload = {
    userId,
    authCode,
    signature: signedAuthCode,
    key: env.sxtPubKey,
    scheme: 'ed25519'
  };
  const response = await axios.post(url, payload);

  if (response.status !== 200) {
    // console.error('Failed to request token from the API!');
    // console.error(response.status, response.data);
    process.exit();
  }

  return response.data;
}


function base64ToUint8(base64PrivateKey, base64PublicKey) {
  let privateKeyBuffer = Buffer.from(base64PrivateKey, 'base64');
  let publicKeyBuffer = Buffer.from(base64PublicKey, 'base64');

  let privateKeyUint8 = new Uint8Array(privateKeyBuffer.buffer, privateKeyBuffer.byteOffset, privateKeyBuffer.byteLength);
  let publicKeyUint8 = new Uint8Array(publicKeyBuffer.buffer, publicKeyBuffer.byteOffset, publicKeyBuffer.byteLength);

  if (privateKeyUint8.length === publicKeyUint8.length) {
    let temporaryPrivateKey = [];

    for (let idx = 0; idx < privateKeyUint8.length; idx++) {
      temporaryPrivateKey[idx] = privateKeyUint8[idx];
    }

    for (let idx = 0; idx < publicKeyUint8.length; idx++) {
      temporaryPrivateKey[privateKeyUint8.length + idx] = publicKeyUint8[idx];
    }

    privateKeyUint8 = temporaryPrivateKey;
  }

  let PrivateKeyUint8Array = new Uint8Array(privateKeyUint8.length);
  for (let i = 0; i < privateKeyUint8.length; i++) {
    PrivateKeyUint8Array[i] = privateKeyUint8[i];
  }

  return PrivateKeyUint8Array;
}

module.exports = {
  sxtAuthenticate: main,
}