var pubnub = require('pubnub').init({
 subscribe_key : "sub-c-66ec2e6e-695e-11e2-903d-12313f022c90",
publish_key   : "pub-c-6247f7dc-f008-4d9e-9475-0c33fe5f8b06",
 origin : "jose.pubnub.com"

});

pubnub.subscribe(
 { 
  channel : 'example',
  callback : function (message) { console.log(message)},
 } 
);
