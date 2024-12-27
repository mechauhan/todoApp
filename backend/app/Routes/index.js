const express = require('express');
const router = express.Router();

const userRoute = require('./user');

for (const property in userRoute) {
  console.log('property', property);
  router.use('/user', userRoute[property]);
}

module.exports = router;
