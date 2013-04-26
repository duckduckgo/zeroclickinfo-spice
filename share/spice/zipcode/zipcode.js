var ddg_spice_zipcode = function(api_result) {
    Spice.render({
        data              : api_result,
        header1           : "Zip Code",
        force_big_header  : true,
        source_name       : "MapQuest",
        source_url        : "http://mapq.st/",
        template_normal   : "zipcode"
    });

    var loadMap = function() {
        // Point to the icons folder.
        L.Icon.Default.imagePath = "/dist/images";

        // Initialize the map.
        var map = L.map('map');

        // Tell Leaflet where to get the map tiles.
        L.tileLayer('http://{s}.tile.cloudmade.com/2f62ad0b4ba046f2b907b67e2c866fa4/997/256/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy <a href="http://cloudmade.com">CloudMade</a>',
            maxZoom: 18
        }).addTo(map);

        // Let's make a rectangle, shall we?
        var southWest = api_result.places.place[0].boundingBox.southWest;
        var northEast = api_result.places.place[0].boundingBox.northEast;

        southWest = new L.LatLng(southWest.latitude, southWest.longitude);
        northEast = new L.LatLng(northEast.latitude, northEast.longitude);

        var bounds = bounds = new L.LatLngBounds(southWest, northEast);

        L.rectangle(bounds).addTo(map);

        map.fitBounds(bounds);
    };

    $.getScript("/dist/leaflet.js", loadMap);
};