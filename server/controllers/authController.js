const User = require('../models/User');
const asyncWrapper = require('../middleware/async');


//
const temp = asyncWrapper(async (req, res) => {
    res.send('controller ok');
})



module.exports = {
    temp
}