/*
var MyRequest = Titanium.Network.createHTTPClient();
MyRequest.onload = function(){
	Titanium.API.debug(this.getResponseHeader('Set-Cookie'));
	alert(this.responseText);
};
MyRequest.onerror = function() {
        Ti.API.error(this.status + ' - ' + this.statusText);
};
MyRequest.open('POST', "http://beta.whilewairport.com/api/login");
MyRequest.send({'username':'sevir','password':'ostras'})
*/
function net(){
      method = "POST";
      cookie = null;
      network = Titanium.Network;
      objectToGet = function(p){
      	      var r = "";
      	      for (var i in p){
      	      	      r += i + "=" + p[i] + "&";
      	      }
      	      return r;
      }

      function constructor(){
          this.request = function(get_or_post, url, params, on_result, on_error){
          	  if (typeof(get_or_post)!="string"){
          	  	Ti.API.error("metodo no es un string");
          	  	return false;
          	  }
          	  if (typeof(url)!="string"){
          	  	Ti.API.error("La url no es un string");
          	  	return false;
          	  }
          	  method = get_or_post.toUpperCase();
          	  if (method == "GET"){
          	  	url = url + "?" + objectToGet(params);
          	  	params = {}
          	  }
          	  myrequest = network.createHTTPClient();
          	  if (myrequest == null){
          	  	Ti.API.error("No se pudo crear el cliente http");
          	  	return false;
          	  }
          	  myrequest.open(method, url);

          	  myrequest.onload = function(){
          	  	  cookie = this.getResponseHeader("Set-Cookie");
          	  	  Ti.API.info(this.responseText);
          	  	  on_result(this);
          	  }

          	  myrequest.onerror = function (){
          	  	  Ti.API.error(this.status+" : "+this.statusText);
          	  	on_error(this);
          	  }

          	  Ti.API.info("llamamos a "+ url);
          	  if(cookie){
          	  	myrequest.setRequestHeader("Cookie",cookie);
          	  }
          	  myrequest.send(params);
          }
          this.online = function(){
          	  return network.online;
          }
      }

     return new constructor();
   }
