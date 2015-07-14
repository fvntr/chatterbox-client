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

var rooms = {};

app.fetch = function(){
	$.ajax({
	  // This is the url you should use to communicate with the parse API server.
	  url: app.server,
	  type: 'GET', //changed to get for updating the DOM
	  data: JSON, //stringify still parses srcipt, need to find a way to stop parsing
	  contentType: 'application/jsonp', //refers to jsonp lib, switched in order to break some user input
	  order: 'createdAt',
	  success: function (data) { //execute on sucess
	    //console.log(data.results);
	    data.results.forEach(function(message){ //iterate over messages 
	    	var cleanText = $("<p></p>").text(message.username+ " : " + message.text + " sent at "+ message.createdAt);	    	
	    	$("#messageOutput").prepend(cleanText); //put messages on the message Div
	    	if(message.roomname){
	    		rooms[message.roomname] = message.roomname
	    	}
	    })
	  },
	  error: function (data) { //executes on failure
	    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
	    console.error('chatterbox: Failed to get');
	  }
	});
}

var chatRoomNameGenerator = function(){
		$('.chatRooms').empty();
	_.each(rooms, function(room){
		if(room){
			$('.chatRooms').append("<option class='rooms'>"+room+"</option>")
		}
	});
}

setInterval(function(){app.fetch()}, 2000); //periodically gets new messages
setInterval(function(){chatRoomNameGenerator()}, 2000); //periodically gets new messages

app.clearMessages = function (){
	$('#messageOutput').empty();
}

$(document).ready(function(){ //initiating the DOM
	// app.fetch()
	// chatRoomNameGenerator();
	$('.submitButton').on('click', function(){ //event check of button click
		var message = {}; //creating object to pass into server
		message.text = $(".messageField").val(); //defining the text of the message
		message.username = window.location.search.slice(10); //grabbing user name from config.js (window/DOM search)
		app.send(message) //sends contents of form field
		
		$('.messageField').val('chat here'); //resets the form
	});
	$('.clearButton').on('click', function(){
		app.clearMessages()
	})
	$('.chatRooms').change(function(){
		//clear messageOutput
		$('#messageOutput').empty();
		//get all messages with roomname selected
		var thisRoom = $( ".chatRooms option:selected" ).text())

		//display only messages with selected roomname

		// alert('You\'ve slected a new room');
	})
});

