const route = require('express').Router();

let TopicA = require('./controller.topicA');

let topicA = new TopicA();

route.get("/subscribe", (req,res)=> {

  topicA.streaming(req,res,5000)  
}
);

route.post("/publish",(req,res)=>{ 
console.log(req.body.message);
    topicA.push(req.body.message)
    res.end()
})


module.exports = route;