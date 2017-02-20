document.addEventListener("DOMContentLoaded", function() {
	chrome.management.getAll(getAllCallback);
	var oldtime = getTime();
	setInterval(updateDateTime, 2000);
});

function getTime()  {
  var d = new Date();
  return d.getTime();
}

function updateDateTime() {
	var currDate = new Date().toLocaleDateString();
	$('#date').html(currDate);
	
	var currTime = new Date().toLocaleTimeString('en-US', { hour12: true, hour: "numeric", minute: "numeric"});
	$('#time').html(currTime);
}

var getAllCallback = function(list) {
	var len = 1013;
	var d = new Date();
	var halfHour = d.getMinutes() >= 30 ? 'half past' : '';
	Math.seedrandom(d.toLocaleDateString() + ',' + halfHour + d.getHours());
	var randImg = Math.floor(Math.random()*len);
	
	// get image
	var imgUrl = "https://unsplash.it/"+screen.width+"/"+screen.height+"?image="+randImg;
	document.body.style.background = 'url('+imgUrl+') no-repeat center center'
	
	// get quote
	$.get("quotes.json", function(data){
		var quotes = data.quotes;
		var quoteStr = quotes[Math.floor(Math.random()*quotes.length)];
		var quote = document.getElementById("quote");
		quote.appendChild(document.createTextNode(quoteStr));
	}, "json");
	
	// get current date
	var date = document.getElementById("date");
	var currDate = new Date().toLocaleDateString();
	date.appendChild(document.createTextNode(currDate));
	
	// get current time
	var time = document.getElementById("time");
	var currTime = new Date().toLocaleTimeString('en-US', { hour12: true, hour: "numeric", minute: "numeric", second: "numeric"});
	time.appendChild(document.createTextNode(currTime));
};