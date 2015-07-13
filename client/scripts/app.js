// YOUR CODE HERE:

var messageBox = $('.messages'); //setting messages to a var we can access
//console.log(messageBox)
// var initialTime = messageBox.context.lastModified;


var getMessages = function(){
	$.ajax({
	  // This is the url you should use to communicate with the parse API server.
	  url: 'https://api.parse.com/1/classes/chatterbox',
	  type: 'GET', //changed to get for updating the DOM
	  data: JSON, //stringify still parses srcipt, need to find a way to stop parsing
	  contentType: 'application/json', //refers to json lib
	  order: 'createdAt',
	  success: function (data) { //execute on sucess
	    console.log(data);
	    data.results.forEach(function(message){ //iterate over messages 
	    	$(".messages").append("<p>"+message.createdAt+"</p>"); //put messages on the message Div
	    })
	 //    for(var key in data.results){
		// $('#messageOutput').append(key.text)
		// }
	  },
	  error: function (data) { //executes on failure
	    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
	    console.error('chatterbox: Failed to get');
	  }
	});

}

var postMessages = function(message){
		$.ajax({
	  // This is the url you should use to communicate with the parse API server.
	  url: 'https://api.parse.com/1/classes/chatterbox',
	  type: 'POST',
	  data: JSON.stringify(message),
	  contentType: 'application/json',
	  success: function (data) {
			console.log("chatterbox: Posted");
	  },
	  error: function (data) {
	    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
	    console.error('chatterbox: Failed to send message');
	  }
	});
}



setInterval(getMessages(), 200);

$(".submitButton").on("click", function(event){
    	console.log("chatterbox: was clicked")
    }) 