var initializeMap = function () {
	return new google.maps.Map(document.getElementById('map'), {
		center: {lat:51.508742, lng:-0.120850},
		zoom:14,
		minZoom:1,
		maxZoom:100
	});
}

var renderLocationsToMap = function (map, data) {
	var points = [];
	var path;
	var destination;
	for (var i = 0; i < data.path.length; i++) {
		points.push(new google.maps.LatLng(data.path[i].location.coordinates[0], data.path[i].location.coordinates[1]));
	};

	destination = new google.maps.Marker({
		position: new google.maps.LatLng(data.destination.location.coordinates[0], data.destination.location.coordinates[1])
	});

	console.log(data.destination.location.coordinates);
	console.log(destination);

	path = new google.maps.Polyline({
		path: points,
		strokeColor: "#0000FF",
		strokeOpacity: 0.8,
		strokeWeight: 2
	});

	path.setMap(map);
	destination.setMap(map);
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