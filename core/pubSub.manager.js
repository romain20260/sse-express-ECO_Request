const Events = require('events');
const res = require('express/lib/response');

//cannot use event to emit from pubblish method a noise and trigger un suscribe 
//a callback to res.write the message cause 
class pubSubManager{
    constructor(){
        this.newMessage;
        this.ev = new Events()
        this.eventName;
    }

    publish(message){
        //TODO check message exist and ERROR message 
            message = {
                id: `${Date.now()}`,
                message: message
            }
            this.newMessage = message
            this.eventName = this.newMessage.id.toString();
            console.log("hey push ....");
            // setTimeout(()=>{
            //     console.log("request push : "+ Date.now());
            //     this.ev.emit(this.eventName)
            // },200)
    }
    suscribe(res,timeOut){
    
        res.on("close",()=>{
            this.ev.removeAllListeners("message")
            console.log(this.ev._event);
        })
        //TODO generator yield try 
            setInterval(()=>{
            console.log("request :"+this.eventName);
                if(this.eventName !== undefined)
                {
                this.ev.on(this.eventName,()=>{
                console.log("trigger");
                res.write(`data: ${this.newMessage.id},${this.newMessage.message} \n\n`)
                this.ev.removeAllListeners(this.eventName)
                this.eventName = undefined;
                console.log(this.ev);
                     })
                }
            },300)
            
        
        

    


 


 
        
    }
    onClose(res){
            console.log("conncetion closed");
            console.log(this.ev);
            res.end();

    }
    
}

module.exports= pubSubManager;