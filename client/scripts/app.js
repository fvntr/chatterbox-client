/*
OBJECTIVES: 

*Refactor fetch success to implement helper functions that we've defined spaghettily
*Figure out how to modularize chat room functionality
*Start and finish friends requirements 
*Actually implement init 

*/





// YOUR CODE HERE:
var app = {};

app.server ='https://api.parse.com/1/classes/chatterbox';
app.username = 'anonymous';
app.roomname = 'common room';

app.init = function(){return true};

app.send= function(data){
	$.ajax({
	 // This is the url you should use to communicate with the parse API server.
	  url: app.server,
	  type: 'POST', //posting function
	  data: JSON.stringify(message), //stringifies it 
	  contentType: 'application/jsonp',
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
	  data: {order: '-createdAt'}, //stringify still parses srcipt, need to find a way to stop parsing
	  contentType: 'application/jsonp', //refers to jsonp lib, switched in order to break some user input
	  success: function (data) { //execute on sucess
	    //data.results.forEach(function(message){ //iterate over messages 
	    	// var cleanText = $("<p></p>").text(message.username+ " : " + message.text + " sent at "+ message.createdAt);	    	
	    	// $("#messageOutput").prepend(_.escape(cleanText)); //put messages on the message Div
	    	// if(message.roomname){
	    	// 	if(!rooms[message.roomname]){
	    	// 		rooms[message.roomname] = [];
	    	// 	}
	    	// 	rooms[message.roomname].push(message)


	    	app.chatRoomNameGenerator(); 


	    	//

	    	//


	    	// }
	    // })
	  },
	  error: function (data) { //executes on failure
	    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
	    console.error('chatterbox: Failed to get');
	  }
	});
}

app.clearMessages = function (){
	$('#messageOutput').empty();
}


app.chatRoomNameGenerator = function(){
	$('#roomSelect').empty();
	_.each(rooms, function(a, room){
		if(room){
			$('#roomSelect').append("<option class='rooms'>"+room+"</option>")
		}
	});
}

app.addRoom = function(name){
	var $newRoom = $('</option').val(name).text(name); 
	$("#roomSelect").append($newRoom);
}

app.addMessage = function(data){
	if(!data.roomname){
		data.roomname = 'common room';
	}

	if(data.roomname === app.roomname){
		var $chatArea = $('<div class= "chat"/>'); 
        var $username = $('<span class="username"/>');
        $username.text(data.username+': ').attr('data-username', data.username).attr('data-roomname',data.roomname).appendTo($chatArea);
	}

	var $message = $('<br><span/>'); 
	$message(data.text).appendTo($chatArea);

	$('#messageOutput').append($chatArea); 
}






var fetch = setInterval(function(){ app.fetch()}, 2000); //periodically gets new messages

var updateRooms = setInterval(function(){chatRoomNameGenerator()}, 2000); //periodically gets new messages






$(document).ready(function(){ //initiating the DOM
	$('.submitButton').on('click', function(){ //event check of button click
		app.addMessage();
		$('.messageField').val(''); //resets the form
	});
	$('.clearButton').on('click', function(){
		app.clearMessages()
		fetch = setInterval(function(){app.fetch()}, 2000);
	})
	$('#roomSelect').change(function(){
		clearInterval(fetch);
		//clear messageOutput
		$('#messageOutput').empty();
		//get all messages with roomname selected
		var thisRoom = $( "#roomSelect option:selected" ).text()
		//console.log(thisRoom)
		//app.clearMessages()
		//display only messages with selected roomname
		rooms[thisRoom].forEach(function(messages){
			// app.send(messages)
			var cleanText = $("<p></p>").text(message.username+ " : " + message.text + " sent at "+ message.createdAt);
			$('#messageOutput').append("<p>"+escape(cleanText)+"</p>")
		})
		//console.log(rooms[thisRoom][0])
	})
	$('.createRoomButton').on('click',function(){
		app.addRoom()
		$('.newChatRoom').val('')
	})
});

