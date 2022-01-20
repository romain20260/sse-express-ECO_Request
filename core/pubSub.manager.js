const Events = require('events');

class pubSubManager{
    constructor(){
        this.nbrOfSuscribe= 0;
        this.newMessage = {id:"void",event:"init",message:"no publish YET"} ;
        this.ev = new Events()
    }
    publish(message){
        //TODO check message exist and ERROR message 
        //destruct and refort the data
        //id should be a number or if is empty put a timstamp
        //event should be string or if empty data
        //message a string or should be stringify 
            message = {
                id: `${Date.now()}`,
                event : "data",
                message: message
            }
            
console.log("push : "+ Date.now());
console.log(message);
            this.newMessage = message
            this.ev.emit("message")
    }
    suscribe(req,res,timeOut){
        
        this.nbrOfSuscribe++

        //that function shoud never be in this class "method"
        let messageEvent = function (){
                    this.ev.emit("deliveroo")
                    this.ev.once("deliveroo",()=>{
                    res.write(`id: ${this.newMessage.id}\nevent: ${this.newMessage.event}\ndata: ${this.newMessage.message}\n\n`)
console.log(this.ev); 
console.log(this.nbrOfSuscribe);
        })};
        //
        messageEvent = messageEvent.bind(this)//have to bind the context of this instance to use this in the function (cause isn't a method a the current instance)
        this.ev.on("message",messageEvent)
        this.ev.emit("message") //mecanisme for the firts time suscribe to trigger l event 
        

        res.on("close",()=>{
            this.nbrOfSuscribe--
            this.ev.removeListener("message",messageEvent)//remove the listenner of execution context
        })
        setTimeout(() => {
            res.end()
        }, timeOut);

    

    }
    
}

module.exports= pubSubManager;