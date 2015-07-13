// YOUR CODE HERE:
var app = {};
app.server='https://api.parse.com/1/classes/chatterbox'
app.init = function(){return true}
app.send= function(message){
	$.ajax({
	 // This is the url you should use to communicate with the parse API server.
	  url: app.server,
	  type: 'POST', //posting function
	  data: JSON.stringify(message), //stringifies it 
	  contentType: 'application/json',
	  success: function (data) { //executes on success
			console.log("chatterbox: Posted");
	  },
	  error: function (data) { //executes on failed 
	    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
	    console.error('chatterbox: Failed to send message');
	  }
	})
}


app.fetch = function(){
	$.ajax({
	  // This is the url you should use to communicate with the parse API server.
	  url: app.server,
	  type: 'GET', //changed to get for updating the DOM
	  data: JSON, //stringify still parses srcipt, need to find a way to stop parsing
	  contentType: 'application/jsonp', //refers to jsonp lib, switched in order to break some user input
	  order: 'createdAt',
	  success: function (data) { //execute on sucess
	    console.log(data);
	    data.results.forEach(function(message){ //iterate over messages 
	    	var cleanText = $("<p></p>").text(message.username+ " : " + message.text + " sent at "+ message.createdAt);
	    	$("#messageOutput").prepend(cleanText); //put messages on the message Div
	    })
	  },
	  error: function (data) { //executes on failure
	    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
	    console.error('chatterbox: Failed to get');
	  }
	});
}


setInterval(app.fetch(), 200); //periodically gets new messages

app.postMessage = function(){

}

$(document).ready(function(){
	$('.submitButton').on('click', function(){
		var message = $(".messageField").val();
		console.log(message);
		app.send(message) //<-- needs to send contents of form field
		//needs to reset form
		//needs to invoke asking for username
	});
});