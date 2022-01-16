
class pubSubManager {
    constructor(){
        this.lastMessage;
        this.newMessage;
        
    }
    publish(message){

            message = {
                id: `${Date.now()}`,
                message: message
            }
            this.newMessage = message
 
           
    }
    suscribe(res){
        //setinterval not good to manage latency or you have to set out to 0
       setInterval(()=>{
           if(this.lastMessage !== this.newMessage)
           {
            res.write(`data: ${this.newMessage.id},${this.newMessage.message} \n\n`);
            this.newMessage = this.lastMessage
           }
       },0)
       //and also prb to have multiple client on samùe suscribe AND 
       //multiple browser page also 

    }
    
}
module.exports= pubSubManager;