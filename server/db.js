const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mern-e-commerce')
    .then(resp => console.log('connect db successfully'))
    .catch(err => console.log(`FAIL: ⛔️ ${err}`))