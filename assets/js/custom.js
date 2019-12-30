// Louisiana Murals
// https://louisianamurals.com
// https://github.com/louisiana-murals

var vm = function() {}; // data model
var arrayMuralsData = ko.observableArray();
var arrayMuralLocations = [];
var sheetMurals = 'https://docs.google.com/spreadsheets/d/1VeQ8-yoxwzsoJGFDOqH_G0u-aX4OX0CcXK8uRhTmMpY/edit#gid=1880698204';

$(function() {
	ko.applyBindings(new vm()); // init knockout

	var loadMuralData = function() {
		sheetrock({
			url: sheetMurals,
			query: 'select A,B,C,D,E,F,G,H,I,J',
			callback: callbackMurals
		});
	}

	var callbackMurals = function(error, options, response) {
		cleanJsonData(response);
	}

	var cleanJsonData = function(data, type) {
		var rows = data.rows;
		var array = [];

		for (var i = 1; i < rows.length; i++) {
			var tempArray = [];
			var label = rows[i].labels;
			var value = rows[i].cellsArray;

			for (var x = 0; x < label.length; x++) {
				tempArray[label[x]] = value[x];
			}

			array.push(tempArray);
		}

		// array.forEach(function(item, index) {
		// 	if (item.Lat && item.Long) {
		// 		arrayMuralLocations.push({
		// 			title: item.Name,
		// 			lat: item.Lat,
		// 			lng: item.Long,
		// 		});
		// 	}
		// });

		// array.forEach(function(item, index) {
		// 	var contentInfoArtists = '';

		// 	if (item.Artist1Name || item.Artist2Name) {

		// 		if (item.Artist1Name && item.Artist1Website) {
		// 			contentInfoArtists += '<a target="artist" href="' + item.Artist1Website + '">' + item.Artist1Name + '</a>';
		// 		} else if (item.infoArtistName1 && !item.Artist1Website) {
		// 			contentInfoArtists += item.Artist1Name;
		// 		}

		// 		if (item.Artist1Name && item.Artist2Name) {
		// 			contentInfoArtists += ', ';
		// 		}

		// 		if (item.Artist2Name && item.Artist2Website) {
		// 			contentInfoArtists += '<a target="artist" href="' + item.Artist2Website + '">' + item.Artist2Name + '</a>';
		// 		} else if (item.infoArtistName2 && !item.Artist2Website) {
		// 			contentInfoArtists += item.Artist2Name;
		// 		}

		// 		array[index].InfoArtists = contentInfoArtists;
		// 	}
		// });

		arrayMuralsData(array);

		console.table(arrayMuralsData());
		console.table(arrayMuralLocations);

		init();
	}

	var init = function() {
		//loadMuralMap();
		//$('body').removeClass('loading');
		//$('#content').removeClass('loading-spinner');
		//$('[data-toggle="tooltip"]').tooltip();
$('.copy-address').on('click', function() {
//     var copyText = document.querySelector("#input");
//     copyText.select();
//     document.execCommand("copy");
	$(this).closest('.address-block').css({'border': '5px solid red'});
});

	}

	// function loadMuralMap() {
	// 	var map;
	// 	var marker = [];
	// 	var infowindow = [];
	// 	var markerImage = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/info-i_maps.png';

	// 	map = new google.maps.Map(
	// 		document.getElementById('mural-map'), {
	// 			center: new google.maps.LatLng(30.4451801, -91.1904776), // Baton Rouge
	// 			zoom: 15,
	// 			styles: googleMapStyles
	// 		});

	// 	var createMarker = function(lat, lon, html) {
	// 		var newmarker = new google.maps.Marker({
	// 			position: new google.maps.LatLng(lat, lon),
	// 			map: map,
	// 			title: html
	// 		});

	// 		newmarker['infowindow'] = new google.maps.InfoWindow({
	// 			content: html
	// 		});

	// 		google.maps.event.addListener(newmarker, 'mouseover', function() {
	// 			this['infowindow'].open(map, this);
	// 		});

	// 		google.maps.event.addListener(newmarker, 'mouseout', function() {
	// 			this['infowindow'].close();
	// 		});

	// 		google.maps.event.addListener(map, 'tilesloaded', function() {
	// 			$('#mural-map').find('img[src="https://maps.gstatic.com/mapfiles/szc4.png"]').parent('.gmnoprint').css('YOUR_STYLE_HERE', 'YOUR_VALUE_HERE');
	// 		});

	// 		marker.push(newmarker);
	// 	}

	// 	var centerMap = function() {
	// 		var bound = new google.maps.LatLngBounds();

	// 		for (i = 0; i < arrayMuralLocations.length; i++) {
	// 			bound.extend( new google.maps.LatLng(arrayMuralLocations[i].lat, arrayMuralLocations[i].lng) );
	// 		}

	// 		map.fitBounds(bound);
	// 	}
	// 	centerMap();

	// 	// var chicago = {lat: 41.850, lng: -87.650};

	// 	// google.maps.event.addDomListener(outer, 'click', function() {
	// 	//   map.setCenter(chicago)
	// 	// });

	// 	arrayMuralLocations.forEach(function(e) {
	// 		createMarker(e.lat, e.lng, e.title);
	// 	});
	// }

	loadMuralData();
	//loadMuralMap();



});

// var cleanURL = function(url) {
// 	return url.replace('https://', '').replace('http://', '').replace('www.', '')
// }

var googleMapStyles = [{
		"featureType": "all",
		"elementType": "labels.text.fill",
		"stylers": [{
				"saturation": 36
			},
			{
				"color": "#000000"
			},
			{
				"lightness": 40
			}
		]
	},
	{
		"featureType": "all",
		"elementType": "labels.text.stroke",
		"stylers": [{
				"visibility": "on"
			},
			{
				"color": "#000000"
			},
			{
				"lightness": 16
			}
		]
	},
	{
		"featureType": "all",
		"elementType": "labels.icon",
		"stylers": [{
			"visibility": "off"
		}]
	},
	{
		"featureType": "administrative",
		"elementType": "geometry.fill",
		"stylers": [{
				"color": "#000000"
			},
			{
				"lightness": 20
			}
		]
	},
	{
		"featureType": "administrative",
		"elementType": "geometry.stroke",
		"stylers": [{
				"color": "#000000"
			},
			{
				"lightness": 17
			},
			{
				"weight": 1.2
			}
		]
	},
	{
		"featureType": "landscape",
		"elementType": "geometry",
		"stylers": [{
				"color": "#000000"
			},
			{
				"lightness": 20
			}
		]
	},
	{
		"featureType": "poi",
		"elementType": "geometry",
		"stylers": [{
				"color": "#000000"
			},
			{
				"lightness": 21
			}
		]
	},
	{
		"featureType": "road.highway",
		"elementType": "geometry.fill",
		"stylers": [{
				"color": "#000000"
			},
			{
				"lightness": 17
			}
		]
	},
	{
		"featureType": "road.highway",
		"elementType": "geometry.stroke",
		"stylers": [{
				"color": "#000000"
			},
			{
				"lightness": 29
			},
			{
				"weight": 0.2
			}
		]
	},
	{
		"featureType": "road.arterial",
		"elementType": "geometry",
		"stylers": [{
				"color": "#000000"
			},
			{
				"lightness": 18
			}
		]
	},
	{
		"featureType": "road.local",
		"elementType": "geometry",
		"stylers": [{
				"color": "#000000"
			},
			{
				"lightness": 16
			}
		]
	},
	{
		"featureType": "transit",
		"elementType": "geometry",
		"stylers": [{
				"color": "#000000"
			},
			{
				"lightness": 19
			}
		]
	},
	{
		"featureType": "water",
		"elementType": "geometry",
		"stylers": [{
				"color": "#000000"
			},
			{
				"lightness": 17
			}
		]
	}
];
