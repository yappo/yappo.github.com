$(function() {
	$("#tou-detail").hide();
	$("#scripts").hide();

/*
		var script = $('<SCRIPT src="https://api.loctouch.com/v1/spots/search?lat=35.595963&lng=139.573681&callback=listUpdate" />');
		$("#scripts").append(script);
return;
*/
	navigator.geolocation.getCurrentPosition(function(pos) {
		var lat = pos.coords.latitude
		var lng = pos.coords.longitude;
		var script = $('<SCRIPT src="https://api.loctouch.com/v1/spots/search?lat=' + lat + '&lng=' + lng + '&callback=listUpdate" />');
		$("#scripts").append(script);
	});
});

function listUpdate(json) {
	console.log(json);
	var $ul = $("#loc-list");
	$ul.empty();
	$.each(json.spots, function(i, obj) {
		var $li = $("<LI></LI>");
		var $name = $("<DIV></DIV>");
		$name.addClass("name");
		var $icon = $("<IMG >");
		$icon.attr("src", obj.icon.small);
		$name.append($icon).append(obj.name);
		var $address = $("<DIV></DIV>");
		$address.text(obj.address);
		var $map = $("<DIV></DIV>");
		$map.attr("id", obj.id).css({ width: "388px", height: "196px" });
		$li.append($name).append($address).append($map);
		$ul.append($li);

		var latlng = new google.maps.LatLng(obj.lat, obj.lng);
		var myOptions = {
			zoom: 18,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(document.getElementById(obj.id), myOptions);
		var marker = new google.maps.Marker({
			position: latlng,
			map: map,
			title: ""
		});
	});
}