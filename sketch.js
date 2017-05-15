//P5 Stuff
var masterLat = 40.0076477;
var masterLon = -105.26997750000001;
var theR;
var theG;
var theB;
var theDist;


function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	var r = map((255 * theDist) / 100, 0, 100, 0, 255);
	var g = map(((255 * (100 - theDist)) / 100, 0,100, 0, 255));
	console.log(theDist);
	fill(r,g,0,60);
	rect(100,100,100,100);
}
