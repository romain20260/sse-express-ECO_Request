require('dotenv').config();
const express = require('express');
let app = express();
/////
//import topics route to the central router
const topicA = require('./topicA/routes.topicA');
/////
//
/////
//middleware
//
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use("/topicA",topicA)



app.listen(3210, () => {
    console.log('App listening on port 3000!');
});