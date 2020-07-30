var pubnub = require('pubnub').init({ 
 subscribe_key : "sub-c-66ec2e6e-695e-11e2-903d-12313f022c90",
publish_key   : "pub-c-6247f7dc-f008-4d9e-9475-0c33fe5f8b06",
 origin : "jose.pubnub.com"
});

pubnub.publish(
 { 
  channel : 'example',
 message: { text : "eyyyy youuuuuu"},
 callback : function(info){
                if (!info[0]) console.log("Failed Message Delivery")
               		console.log(info);

            }
 } 
);
