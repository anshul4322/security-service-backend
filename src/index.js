const mongoose = require('mongoose');
const app = require('./app');
const config = require("./config/config");

let server;

mongoose
.connect(config.mongoose.url, config.mongoose.options)
.then(() => {
    app.listen(config.port, (req,res) => { 
        console.log(`Server started at ${config.port}`);
    })
    console.log("Connected to MongoDB");
});
