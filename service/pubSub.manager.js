const Events = require('events');
const res = require('express/lib/response');
;
class pubSubManager{
    constructor(){
        this.nbrOfSuscribe= 0;
        this.newMessage = {id:"void",event:"init",data:"no publish YET"} ;
        this.ev = new Events();
        this.ev.setMaxListeners(0);
    }
    publish(payload,res){
    try {
            if(!payload || payload && Object.keys(payload).length===0)throw "payload doesn't exist or is a empty object (should have minimun a data prop or event prop)"
            else{
                this.newMessage.id = (payload.id && Number.isInteger(payload.id))? payload.id:Date.now();
                this.newMessage.event = (payload.event && typeof payload.event ==="string")? payload.event:"message";
                this.newMessage.data = (payload.data)? JSON.stringify(payload.data):null; 
                this.ev.emit("message")  
                res.json({response:`your event : ${this.newMessage.event} ... have be sent to the server`})
                res.end()
            } 
    } catch (error) 
    {
                res.json({response:`ERROR`,message:error})
                res.end()
    }
             
    }
    suscribe(req,res,timeOut){
        timeOut = (timeOut)? timeOut:3600000;
        this.nbrOfSuscribe++
        //that function shoud never be in this class "method"
        let messageEvent = function (){  
            //TODO question this is important to check all ???? 
            if (!req.params.event || typeof req.params.event === "string" && req.params.event === "all")
            {//only if you suscribe for all events "default" Or event params is egal to all'
//console.log("triger all events");
                this.ev.emit("deliveroo")
                this.ev.once("deliveroo",()=>{
                res.write(`id: ${this.newMessage.id}\nevent: ${this.newMessage.event}\ndata: ${this.newMessage.data}\n\n`)})
            }
            else if(req.params.event && typeof req.params.event === "string" && req.params.event === this.newMessage.event)
            {//only a specifie event
//console.log("trigger event only");
                this.ev.emit("deliveroo")
                    this.ev.once("deliveroo",()=>{
                        //TODO question does i should sent event type message to be more manager in the client js native 
                        res.write(`id: ${this.newMessage.id}\nevent: ${this.newMessage.event}\ndata: ${this.newMessage.data}\n\n`)}
                    )
            }
            else if(req.params.event !== this.newMessage.event)
            {//for suscriber with event doesn t match with the emit event
//console.log("nothing trigger");
            }

// //console.log(this.ev); 
// //console.log(this.nbrOfSuscribe);
    };
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