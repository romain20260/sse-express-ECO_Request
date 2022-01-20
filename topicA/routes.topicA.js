const route = require('express').Router();

let TopicA = require('./controller.topicA');

let topicA = new TopicA();

route.get("/subscribe", (req,res)=> {

  topicA.streaming(req,res,10000)  
}
);

route.post("/publish",(req,res)=>{ 

    topicA.push(req.body.message)
    res.end()
})


module.exports = route;