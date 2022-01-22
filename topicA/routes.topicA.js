const route = require('express').Router();

let TopicA = require('./controller.topicA');
let topicA = new TopicA();

route.get("/subscribe", (req,res)=>topicA.streaming(req,res,3600000));
route.get("/subscribe/:event",(req,res)=>topicA.streaming(req,res,3600000));

route.post("/publish",(req,res)=>topicA.push(req.body,res));

module.exports = route;