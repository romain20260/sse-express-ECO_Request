# EasySSE server 

***

# firts

<p>EasySSE is base over server sen event protocol, is provide a service too easy push and broadcast event data trought alike pub/Sub server.</P>
<br>
<p>the server over the service pub/sub use is express.js and the service pub/sub have NOT security part inside, you have to implement your own security and policy in express.js (like a middleware, using CORS, JWT, ....)the service have only to be bridge between push event and broadcast them</P>

***

# protocole

<h2>client "suscriber Frontend" side</h2>
<br>
<p>Using EventSource : 
<li>using on eventsource client addEventListenner([nameOfEvent],[callback])</li>

<li>you can using propertie of eventsource onmessage = callback ; to manage all message event ("message" event is the default event if was nothing declared by the pusher)</li>
<br>
<H2>client "pusher"</h2>
<li>use http post request to push and emit on the server
<li>the body have to be structured like :<br>

{

id : [integer] default: timestamp

event : [string] default: message

data: [any] default: null

}<br>
![postman!](assetsReadMe\sseSendEvent.PNG)
PRO: let the server put a timestamp to identifie the event<br>
![postman!](assetsReadMe\postmanSSE.PNG)

<h2>EasySSE server</h2>

<ul> <h3>routes suscriber</h3>
<li> GET [channelName]\subscribe <br> to subscribe all messages of all event emitted on this channel "topic"
<li> GET [channelName]\subscribe\[eventName] <br> to subscribe all messages to a specifie event Name if eventname is egal to all you suscribe to all events
</ul>
<ul><h3>route pusher</h3>
<li> POST [channelName]\publish
</ul><br>

<h2>client Nodejs</h2>
<li> you can use eventsource api (isn't builded on nodejs )you have to install a module
<br> 
<code>

npm install --save eventsource

</code>

***
# tuto

<h2>client js native</h2>

<code>

        let clientSSE = new EventSource("http://localhost:3000/topicA/subscribe")

        clientSSE.addEventListener('data',(event)=>{
            let data = JSON.parse(event.data);
            let ele = document.createElement("h1");
                ele.innerText= data.title;
                document.body.appendChild(ele)
        })
</code>

<h2>client nodejs </h2>

<code>

        const Eventsource = require('eventsource');

        let sse = new Eventsource("http://localhost:3000/topicA/subscribe")

        sse.addEventListener("data",(event)=>{
        let data = JSON.parse(event.data)
        console.log(data);
        })

</code>

<h2>serveur expressjs</H2>

<h4>arbo server</h4>

![arborescence!](assetsReadMe\arboServer.PNG)

<li>routes
<code>

        const route = require('express').Router();

        let TopicA = require('./controller.topicA');

        let topicA = new TopicA();

        route.get("/subscribe", (req,res)=>topicA.streaming(req,res,3600000));
        route.get("/subscribe/data", (req,res)=>topicA.streaming(req,res,3600000));
        route.post("/publish",(req,res)=>topicA.push(req.body,res));

        module.exports = route;

</code>

<li>controller
<code>

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
            this.manager.publish(data,res)
        }
    }
    module.exports = TopicA;


</code>


***

# remember

<li> WARNING not securite is include natively your pusher should be authenticate and input verify in express.js level. client "subcribe" should also check what data he recieve before use-it
<li> you can use only en message event use clientsse.onmessage = [callback]
<li> the pusher data structure should be respected, we should not set id (let the server do a auto timestamp id)
<li>if you are only one type of event you should let message for be handle with a onmessage properties
<li>with sse you will always reconnect the request after a end of request except if the client close the connection By The Way the server have a setTimeout setup (1h default) to close the connection

***
<H3>global</h3>

![diagrame!](assetsReadMe\Protocol_EasySSE.drawio.png)
<h3>network</h3>

![clientNetwork!](assetsReadMe\clientSubscribe.PNG)

