var initializeMap = function () {
	return new google.maps.Map(document.getElementById('map'), {
		center: {lat:51.508742, lng:-0.120850},
		zoom:14,
		minZoom:14,
		maxZoom:14
	});
}

var renderLocationsToMap = function (map, data) {
	console.log("Recieving data: ", data);
};

var updateLocationData = function (map, targetUrl) {
	$.ajax({
		url: targetUrl,
		type: 'GET',
		success: function (data) {
			renderLocationsToMap(map, data);
		}, 
		error: function (err) {
			console.log("Error getting map data: ", err);
		}
	})
};

var parseUrl = function (url) {
	var parsedUrl = url.split('contact/');
	parsedUrl = parsedUrl[0] + 'userpath/' + parsedUrl[1];
	return parsedUrl;
};

$(document).ready(function () {
	var map = initializeMap();
	var url = parseUrl($(location).attr('href'));
	setTimeout(function () {
		updateLocationData(map, url);
	}, 20000);
});