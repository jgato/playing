/**
  * Copyright (C) 2013 ATOS
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *         http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  * Authors: Javier García Hernández (javier.garcia@atos.net)

  */

//var io = require('socket.io-client');
// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

//Constants
var config = {
	SUBSCRIPTION_HOST : 'lcb-sub.herokuapp.com',
	SUBSCRIPTION_PORT : '80',
	REST_SERVER_HOST:'lcb.herokuapp.com',
	REST_SERVER_PORT:'80'
}

//USER Response Errors
var UNKNWON_ERROR = {};
	UNKNWON_ERROR.error = true;
	UNKNWON_ERROR.code = 0;
	UNKNWON_ERROR.msg = "Unknwon error.";

var URL_ERROR = {};
	URL_ERROR.error = true;
	URL_ERROR.code = 1;
	URL_ERROR.msg = "Bad URL";

var INFRASTRUCTURE_DOWN = {};
	INFRASTRUCTURE_DOWN.error = true;
	INFRASTRUCTURE_DOWN.code = 3;
	INFRASTRUCTURE_DOWN.msg = "Communication infrastructure down.";

var INFRASTRUCTURE_UP = {};
	INFRASTRUCTURE_UP.error = false;
	INFRASTRUCTURE_UP.code = 50;
	INFRASTRUCTURE_UP.msg = "Communication infrastructure up.";

var SDK_PUB_MODE = {};
	SDK_PUB_MODE.error = true;
	SDK_PUB_MODE.code = 100;
	SDK_PUB_MODE.msg = "Operation Denied. SDK operating in Publication Mode.";

var SDK_SUB_MODE = {};
	SDK_SUB_MODE.error = true;
	SDK_SUB_MODE.code = 101;
	SDK_SUB_MODE.msg = "Operation Denied. SDK operating in Subscription Mode.";

var SUBSCRIPTION_LOCKED = {};
	SUBSCRIPTION_LOCKED.error = true;
	SUBSCRIPTION_LOCKED.code = 201;
	SUBSCRIPTION_LOCKED.msg = "This subscription is been used by other process (locked)'}.";

var NOT_SUBSCRIBED = {};
	NOT_SUBSCRIBED.error = true;
	NOT_SUBSCRIBED.code = 202;
	NOT_SUBSCRIBED.msg = "You are not subscribed.";

var SUBSCRIPTION_INCORRECT = {};
	SUBSCRIPTION_INCORRECT.error = true;
	SUBSCRIPTION_INCORRECT.code = 203;
	SUBSCRIPTION_INCORRECT.msg = "Subscription incorrect, bad request.";

var SUBSCRIPTION_CORRECT = {};
	SUBSCRIPTION_CORRECT.error = false;
	SUBSCRIPTION_CORRECT.code = 250;
	SUBSCRIPTION_CORRECT.msg = "You have been subscribed.";

var SUBSCRIPTION_DELETED = {};
	SUBSCRIPTION_DELETED.error = false;
	SUBSCRIPTION_DELETED.code = 251;
	SUBSCRIPTION_DELETED.msg = "Your subscription has been deleted.";

var UNSUBSCRIBED = {};
	UNSUBSCRIBED.error = false;
	UNSUBSCRIBED.code = 252;
	UNSUBSCRIBED.msg = "You have been unsubscribed.";

//function to manage errors
function controlTranslator(message){

	var code;

	try {
		code = message.code;
		
		switch (code) {
			case 102:
				return INFRASTRUCTURE_UP;
			case 103:
				return INFRASTRUCTURE_DOWN;
			case 200:
				return message;
			case 201:
				return SUBSCRIPTION_INCORRECT;
			case 204:
				return SUBSCRIPTION_LOCKED;
			case 250:
				return SUBSCRIPTION_CORRECT;
			case 251:
				return SUBSCRIPTION_DELETED;
			case 401:
				return NOT_SUBSCRIBED;
			case 450:
				return UNSUBSCRIBED;
				
			}

		return UNKNWON_ERROR;
	} catch (e) {
		console.log(e);
		return UNKNWON_ERROR;
	}
}

//Loads the socket.io library
// jQuery(document).ready(function($){
//      /**
//      * function to load a given js file 
//      * tip from fisherman: you can use jquery function instead of this custom function 
//      * http://api.jquery.com/jQuery.getScript
//      */ 
//     loadJS = function(src) {
//        var jsLink = $("<script>");
//        $("head").append(jsLink);
//        jsLink.attr({
//            type: "text/javascript",
//            src: src
//        });
//     }; 	    

//     // load the js file 
//     loadJS("http://"+config.SUBSCRIPTION_HOST+":"+config.SUBSCRIPTION_PORT+"/socket.io/socket.io.js");
    
// });

function getSubID(url){
	//Example URL: http://endpoint:port/subscribe/:subID
	try{
		var tmp = url.split('/');
		return tmp[tmp.length-1];
	}
	catch(err){
		return URL_ERROR;
	}

}

var controlEmpty = function controlEmpty(){

}

//function internalControl(response, control, socket){	

	//Unsubscribe ok
	// if(response != undefined){
	// 	if(response.code == 450)
	// 		socket.removeAllListeners();
	// }	

//	control(controlTranslator(response));
//}

function setControl(control){
	if(control == null)
			control = controlEmpty;

	return control;
}

function subscribeToQueue(myObject, subscriptionData, control, deliveredMessage){

	var localSocket = myObject.socket;

	//var subscription = this.subscription;

	//Store the subscription for future needs
	try{					 	
 		subscription = subscriptionData; 	 	

 		myObject.subscription = subscription;				 	 				 	 	

 	}catch(e){
 		//Return the error response
 		subscription = null;
 		
 		control(controlTranslator(response));			 	 		
 		
 	}			 	 					

	if(!localSocket.socket.connected){						
	    localSocket.once('connect',function subscribeMe(){		
	
			if(subscription != null){
				
				localSocket.emit('subscribeQueue', subscription);
				
			    localSocket.on("message-" + subscription.subkey, function manageDataMessages(data){				
					deliveredMessage(data);
				});	 
			}
		});
	}
	else{
		localSocket.emit('subscribeQueue', subscription);
		localSocket.on("message-" + subscription.subkey, function manageDataMessages(data){				
					deliveredMessage(data);
				});
	}

	localSocket.on('control', function manageControlMessages(data){  				
	   	control(controlTranslator(data));					   	
	});

	localSocket.on('disconnect', function disconnect(){			
		control(controlTranslator(INFRASTRUCTURE_DOWN));
	});

	localSocket.on('reconnect', function reconnect(){	
		localSocket.emit('subscribeQueue', myObject.subscription);
	});

	return localSocket;
}

function AeonSDK(url, subscriptionData){	

	this.socket_server_endpoint = 'http://'+config.SUBSCRIPTION_HOST+':'+config.SUBSCRIPTION_PORT;
	this.rest_server_endpoint = 'http://'+config.REST_SERVER_HOST+':'+config.REST_SERVER_PORT;
	this.mode = '';		
	this.subscription = null;
	this.control = null;

	//Detects if the url is a publish or a subscription url
	if(url.indexOf("publish") != -1){ //Publish url 		
		this.mode = "publish";

		this.url = url;
		
	}
	else if(url.indexOf("subscribe") != -1 ){ //subscription url

		if(subscriptionData != undefined){
			this.subscriptionData = subscriptionData;

			this.mode = "subscribe";		

			this.url = url;

			this.url += '?id='+this.subscriptionData.id+'&desc='+this.subscriptionData.desc;
		}
		else
			this.mode = "error";

	}		
	else
		this.mode = "error";
		
}

AeonSDK.prototype.getSubscription = function(){
	return this.subscription;
}

AeonSDK.prototype.setSubscription = function(subscription){
	this.subscription = subscription;
}

AeonSDK.prototype.subscribe = function subscribe(deliveredMessage, control){	

	var myObject = this;

	this.control = setControl(control);	
	
	if(this.mode == 'subscribe'){

		// else
		// 	this.control = controlEmpty;
		
		if(this.subscriptionData != null){

			this.subID = getSubID(this.url);								

			var socketServer = this.socket_server_endpoint;

			//Connect to the SocketIO server			 	 	
			this.socket = io.connect(socketServer, {'force new connection': true});
													

			//Subscribe throught the API to the mongoDB
			doHTTPRequest(this.url,'GET', null, function(response){
								
				if(response.code == 200){			

					//Subscribe to a queue
					this.socket = subscribeToQueue(myObject, response.result[0], myObject.control, deliveredMessage);					
					
				}
				else
					myObject.control(controlTranslator(response));					
			});					

			
		}
		
	}
	else if(this.mode == "publish")
		this.control(controlTranslator(SDK_PUB_MODE));		
	else
		this.control(controlTranslator(URL_ERROR));
    		
}

AeonSDK.prototype.pauseSubscription = function pauseSubscription(){

	if(this.mode == 'subscribe'){

		if(this.subscription != null)
			this.socket.emit('unSubscribeQueue', this.subscription);			
	}
	else
		this.control(controlTranslator(SDK_PUB_MODE));			
	
}

AeonSDK.prototype.continueSubscription = function continueSubscription(){	

	if(this.mode == 'subscribe'){				

		if(this.subscription != null)
			this.socket.emit('subscribeQueue', this.subscription);
	}
	else
		this.control(controlTranslator(SDK_PUB_MODE));					
	
}

AeonSDK.prototype.deleteSubscription = function deleteSubscription(){		

	if(this.mode == 'subscribe'){
		this.socket.emit('unSubscribeQueue', this.subscription);

		//Delete Queue from the API
		var url = this.rest_server_endpoint+'/subscribe/'+this.subID;
		
		doHTTPRequest(url, 'DELETE', this.subscription);			
						
	}
	else
		this.control(controlTranslator(SDK_PUB_MODE));				
}

AeonSDK.prototype.publish = function publish(data,control){	

	this.control = setControl(control);

	var myObject = this;

	if(this.mode == 'publish'){
		doHTTPRequest(this.url, 'POST', data, function (response){
			
			//if(response.code == 107)
				myObject.control(controlTranslator(response));
			
		});			
	}
	else	
		this.control(controlTranslator(SDK_SUB_MODE));			

}

//Internal function to manage the XHR requests
var doHTTPRequest = function doHTTPRequest(url, method, data, next){

	var http = null;
	
	http = new XMLHttpRequest();

	http.addEventListener('error', function(error){		
		next(INFRASTRUCTURE_DOWN);
	}, false);

	if(method == 'GET'){
		http.open(method, url, true);
		
		http.onreadystatechange = function() {			
		    if (http.readyState == 4 && http.status==200) {				    		      
		        	next(JSON.parse(http.responseText));
		    }
		}

		http.send(null);	

		
	}		

	if(method == 'POST' || method == 'DELETE'){
		
		http.open(method, url, true);
		
		http.setRequestHeader("Content-Type","application/json");

		http.onreadystatechange = function() {			
		    if (http.readyState == 4 && http.status==200) {				    
		        if(method == "POST")
		        	next(JSON.parse(http.responseText));
		    }
		}

		http.send(JSON.stringify(data));

	}
}

/************/
/* DEMO APP */
/************/

// var data = {id:"webapp", desc:"webapp"};
// var code = 0;
// var sdk_subscribe = new AeonSDK("http://localhost:3000/subscribe/4e59b362-67d6-4220-808d-5e3857f278c7", data, function controlFn(data){
// 	 console.log("Control_SUB:");
// 	 console.log(data);		 
// });

// var sdk_publish = new AeonSDK('http://localhost:3000/publish/29b85779-4e6f-43cc-9d77-0e4eca4b06b5', null, function controlFn2(data){
// 	 console.log("Control_PUB:");
// 	 console.log(data);		 
// });


// sdk_subscribe.subscribe(function deliveredMessage(data){
// 	console.log("Message:");
// 	console.log(data);
// });

// setTimeout(function() {
// 	sdk_subscribe.publish({message:"Esto mola"});
// }, 1000);

// setTimeout(function() {
// 	console.log("Pausando...")
//     sdk_subscribe.pauseSubscription();

//     sdk_publish.publish({message:"Parece q estamos pausados"});

// 	setTimeout(function() {
// 		console.log("Continue...")
// 	    sdk_subscribe.continueSubscription();

// 	    sdk_publish.publish({message:"Ahora recibo todo!"});

// 		setTimeout(function() {
// 			console.log("Borrando...")
// 		    sdk_subscribe.deleteSubscription();

// 		}, 3000);
// 	}, 3000);

// }, 3000);


// sdk_publish.subscribe(function deliveredMessage(data){
// 		console.log("Message:");
// 		console.log(data);
// });