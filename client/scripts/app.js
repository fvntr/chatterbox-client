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
	  contentType: 'application/jsonp', //refers to jsonp lib, switched in order to break some user input
	  order: 'createdAt',
	  success: function (data) { //execute on sucess
	    console.log(data);
	    data.results.forEach(function(message){ //iterate over messages 
	    	var cleanText = $("<p></p>").text(message.text);
	    	$(".messages").append(cleanText); //put messages on the message Div
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
		$('.submitButton').on('click', 
			$.ajax({
			  // This is the url you should use to communicate with the parse API server.
			  url: 'https://api.parse.com/1/classes/chatterbox',
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
		)
}



setInterval(getMessages(), 200); //periodically gets new messages
