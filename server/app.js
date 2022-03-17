require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 80;


// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());


// routes
app.use('/', (req, res) => {
    res.send("PIC. Project")
})


// start server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
});