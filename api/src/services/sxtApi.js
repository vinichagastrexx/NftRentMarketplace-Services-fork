const axios = require('axios');
const env = require('../../config/env');

class SxTApi {
  static async dml({ resourceId, sqlText, accessToken }) {
    const data = {
      resourceId,
      sqlText,
      biscuits: [env.biscuitItems, env.biscuitPools, env.biscuitRents]
    };

    const headers = {
      'Content-Type': 'application/json',
      'accept': '*/*',
      'authorization': `Bearer ${accessToken}`
    };

    try {
      const response = await axios.post(`${env.sxtURL}sql/dml`, data, { headers: headers });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  static async dql({ resourceId, sqlText, accessToken }) {
    const data = {
      resourceId,
      sqlText,
      biscuits: [env.biscuitItems, env.biscuitPools, env.biscuitRents]
    };

    const headers = {
      'Content-Type': 'application/json',
      'accept': '*/*',
      'authorization': `Bearer ${accessToken}`
    };

    try {
      const response = await axios.post(`${env.sxtURL}sql/dql`, data, { headers: headers });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = SxTApi;
