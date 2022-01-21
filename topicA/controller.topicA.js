const SubPub = require('../service/pubSub.manager');

class TopicA{
    constructor(){
        this.manager = new SubPub()
    }
streaming(req,res,timeOut){    
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Access-Control-Allow-Origin', '*');

    this.manager.suscribe(req,res,timeOut);
    }
    //this is push methode to call pubsub core publish methode with data to push 
push(data,res){
        this.manager.publish(data)
        res.end()
    }
}
module.exports = TopicA;

