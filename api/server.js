const express = require('express');
const app = express();
const itemRoutes = require('./routes/itemRoutes');
const { sxtAuthenticate } = require('./helpers/sxtAuth');

app.use(express.json())
app.use(async (req, res, next) => {
  try {
    const authData = await sxtAuthenticate();
    req.accessToken = authData.accessToken;
    next();
  } catch (error) {
    console.error('Failed to authenticate with SxT API:', error);
    res.status(500).send('Failed to authenticate with SxT API');
  }
});
app.use('/items', itemRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});