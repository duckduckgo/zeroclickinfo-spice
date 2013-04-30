var ddg_spice_zipcode = function(api_result) {

    // Check errors.
    if(!api_result || !api_result.places || api_result.places.total === 0) {
        return;
    }

    // Get the original query.
    // We're going to pass this to the More at SoundCloud link.
    var query;
    $("script").each(function() {
        var matched, result;
        matched = $(this).attr("src");
        if(matched) {
            result = matched.match(/\/js\/spice\/zipcode\/(.+?)\//);
            if(result) {
                query = result[1];
            }
        }
    });

    Spice.render({
        data              : api_result,
        header1           : api_result.places.place[0].admin2 + ", " + api_result.places.place[0].admin1,
        force_big_header  : true,
        source_name       : "MapQuest",
        source_url        : "http://mapq.st/map?q=" + query,
        template_normal   : "zipcode"
    });

    var loadMap = function() {
        // Point to the icons folder.
        L.Icon.Default.imagePath = "/dist/images";

        // Initialize the map.
        var map = L.map('map');

        // Tell Leaflet where to get the map tiles.
        L.tileLayer('http://{s}.tile.cloudmade.com/2f62ad0b4ba046f2b907b67e2c866fa4/997/256/{z}/{x}/{y}.png', {
            maxZoom: 18
        }).addTo(map);

        // Let's make a rectangle, shall we?
        // This rectangle is used to mark the area occupied by the area code.
        $(".places").each(function(index) {
            var southWest = $(this).data("southwest").split("|");
            var northEast = $(this).data("northeast").split("|");

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

Handlebars.registerHelper("checkZipcode", function(context, options) {
    var result = [];
    var place = this.places.place;
    var name = place[0].name;

    if(place.length === 1) {
        return;
    }

    for(var i = 1; i < place.length; i += 1) {
        if(place[i].name === name) {
            result.push(place[i]);
        }
    }

    return context.fn(result);
});