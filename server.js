// HTTP PORTION

var http = require('http');
var fs = require('fs');
var httpServer = http.createServer(requestHandler);
var url = require('url');
httpServer.listen(8080);

function requestHandler(req, res) {

	var parsedUrl = url.parse(req.url);
	// console.log("The Request is: " + parsedUrl.pathname);
		
	fs.readFile(__dirname + parsedUrl.pathname, 
		function (err, data) {
			if (err) {
				res.writeHead(500);
				return res.end('Error loading ' + parsedUrl.pathname);
			}
			res.writeHead(200);
			res.end(data);
  		}
  	);
}

var masterLat = 40.0076477;
var masterLon = -105.26997750000001;

// WEBSOCKET PORTION

var io = require('socket.io').listen(httpServer);

io.sockets.on('connection', 

	function (socket) {
	
		console.log("We have a new client: " + socket.id);
		
		///MY SOCKET EVENTS HERE
		socket.on('currentloc', function (data){
			console.log("recieved location from client");
			// console.log(data);
			var lat = data.lat;
			var lon = data.lon;
			console.log(lat + ", " + lon);

			var distSquare = (masterLat - lat)*(masterLat - lat) + (masterLon - lon)*(masterLon - lon);
			console.log("distSquare = " + distSquare);
			socket.emit('dist', distSquare);
		});


		socket.on('disconnect', function() {
			console.log("Client has disconnected " + socket.id);
		});
	}
);