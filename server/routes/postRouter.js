const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("post ok");
})

module.exports = router;