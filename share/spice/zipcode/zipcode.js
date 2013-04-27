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
        // This rectangle is used to mark the area occupied by the area code.
        $(".places").each(function(index) {
            var southWest = [$(this).data("southwest-latitude"), $(this).data("southwest-longitude")];
            var northEast = [$(this).data("northeast-latitude"), $(this).data("northeast-longitude")];

            console.log(southWest, northEast);

            southWest = new L.LatLng(southWest[0], southWest[1]);
            northEast = new L.LatLng(northEast[0], northEast[1]);

            var bounds = new L.LatLngBounds(southWest, northEast);
            L.rectangle(bounds).addTo(map);

            if(index === 0) {
                map.fitBounds(bounds);
            }

            $(this).click(function() {
                (function(bounds) {
                    map.fitBounds(bounds);
                }(bounds));
            });
        });
    };

    $.getScript("/dist/leaflet.js", loadMap);
};

Handlebars.registerHelper("similar", function(place, firstName, options) {
    var result = "";
    for(var i = 1; i < place.length; i += 1) {
        if(place[i].name === firstName) {
            result += options.fn(place[i]);
        }
    }
    return result;
});