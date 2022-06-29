const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_ATLAS)
    .then(resp => console.log('connect db successfully'))
    .catch(err => console.log(`FAIL: ⛔️ ${err}`))