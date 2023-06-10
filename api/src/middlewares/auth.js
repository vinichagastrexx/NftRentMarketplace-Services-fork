const { sxtAuthenticate } = require('../../helpers/sxtAuth');

const authMiddleware = async (req, res, next) => {
  try {
    const authData = await sxtAuthenticate();
    req.accessToken = authData.accessToken;
    next();
  } catch (error) {
    res.status(500).send('Failed to authenticate with SxT API');
  }
};

module.exports = authMiddleware;
