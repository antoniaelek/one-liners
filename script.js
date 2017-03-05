document.addEventListener("DOMContentLoaded", function() {
	chrome.management.getAll(getAllCallback);
	setInterval(updateDateTime, 2000);
});

function updateDateTime() {
	var currDate = new Date().toLocaleDateString();
	$('#date').html(currDate);

	var currTime = new Date().toLocaleTimeString('en-US', { hour12: true, hour: "numeric", minute: "numeric"});
	$('#time').html(currTime);
}

var getAllCallback = function(list) {
	Math.seedrandom(new Date().toLocaleDateString());

	var downloadingImage = new Image();
	downloadingImage.onload = function(){
	    //image.src = this.src;
			document.body.style.background = 'url('+downloadingImage.src+') repeat center center';
			document.body.style.backgroundSize = 'cover';
			$('.to-hide').hide();
			$('.hidden').show();
	};
	downloadingImage.src = "https://source.unsplash.com/"+screen.width+"x"+screen.height+"/daily";

	// get image
	//var imgUrl = "https://source.unsplash.com/"+screen.width+"x"+screen.height+"/daily";
	//document.body.style.background = 'url('+imgUrl+') no-repeat center center'

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
	var currTime = new Date().toLocaleTimeString('en-US', { hour12: true, hour: "numeric", minute: "numeric"});
	time.appendChild(document.createTextNode(currTime));
};
