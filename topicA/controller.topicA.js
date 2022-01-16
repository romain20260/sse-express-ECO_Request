const SubPub = require('../core/pubSub.manager');

class TopicA{
    constructor(){
     
        this.manager = new SubPub()

    }
    //route streaming open a stream connection with timeout set by timeOut var  
    streaming(req,res,timeOut){
        
        //setup header we have to mime type event-stream to push event strteam data 
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Access-Control-Allow-Origin', '*');
        //we call the core systeme of subpub and pass the arg res 
        //it we res.write our response for sending
    this.manager.suscribe(res); 
    //     //set up the timeOut with the arg we pass 
    //     //it we close the connection automaticelly
    //     //he optionnelle we can let the connection open 
    setTimeout(()=>{
      this.manager.onClose(res)
    },timeOut)
        //this is our close gate when client disconnect his sse or close by browser
    
    res.on('close', () => {
            this.manager.onClose(res)
    })


    
    }
    //this is push methode to call pubsub core publish methode with data to push 
    push(message){
        this.manager.publish(message)  
    }

}

module.exports = TopicA;

