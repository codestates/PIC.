const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("hashtag_data ok");
})

module.exports = router;