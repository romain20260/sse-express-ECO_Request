const Events = require('events');

//cannot use event to emit from pubblish method a noise and trigger un suscribe 
// a callback to res.write the message cause 
class pubSubManager{
    constructor(){
       
        this.LastMessage = {id:"void",message:"no publish YET"};
        this.newMessage;
        this.ev = new Events()
        this.lol;
 
    }

    publish(message){
        //TODO check message exist and ERROR message 
            message = {
                id: `${Date.now()}`,
                message: message
            }
            console.log("push : "+ Date.now());
            this.newMessage = message
        
    }
    suscribe(res){

       setInterval(()=>{
           if(!this.newMessage){
               this.newMessage = this.LastMessage;
           }
           else if(this.newMessage && this.newMessage != this.LastMessage)
           {
               res.write(`data: ${this.newMessage.id},${this.newMessage.message} \n\n`)
               setTimeout(()=>{
                  this.LastMessage = this.newMessage 
               },1000)
               
           }
           
        },0)

    }
    onClose(res){
            console.log("conncetion closed");
            console.log(this.LastMessage,this.newMessage);
            res.end();

    }
    
}

module.exports= pubSubManager;