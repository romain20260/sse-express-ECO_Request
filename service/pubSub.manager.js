const Events = require('events');
;
class pubSubManager{
    constructor(){
        this.nbrOfSuscribe= 0;
        this.newMessage = {id:"void",event:"init",message:"no publish YET"} ;
        this.ev = new Events();
        this.ev.setMaxListeners(0);
    }
    publish(payload){
        //TODO check message exist and ERROR handle 
        //id should be a number or if is empty put a timstamp
        //event should be string or if empty data
        //message a string or should be stringify 
            payload = {
                id:`${Date.now()}`,
                event : payload.event,
                data: `${JSON.stringify(payload.data)}`
            }
            
//console.log("push : "+ Date.now());
//console.log(payload);
            this.newMessage = payload
            this.ev.emit("message")
    }
    suscribe(req,res,timeOut){

        timeOut = (timeOut)? timeOut:3600000;
        this.nbrOfSuscribe++

        //that function shoud never be in this class "method"
        let messageEvent = function (){
            //TODO here sould check if the suscriber wanna only a special event 
                    this.ev.emit("deliveroo")
                    this.ev.once("deliveroo",()=>{
                    res.write(`id: ${this.newMessage.id}\nevent: ${this.newMessage.event}\ndata: ${this.newMessage.data}\n\n`)
//console.log(this.ev); 
//console.log(this.nbrOfSuscribe);
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