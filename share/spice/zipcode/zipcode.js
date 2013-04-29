var ddg_spice_zipcode = function(api_result) {

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

    Handlebars.registerHelper("checkZipcode", function(context) {
        return context.name === query;
    });

    Spice.render({
        data              : api_result,
        header1           : api_result.places.place[0].admin2 + ", " + api_result.places.place[0].admin1,
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

Handlebars.registerHelper("concat", function(context, options) {
    var result = [];
    var filter = Handlebars.helpers[options.hash.filter] || function() {
        return true;
    };

    var from = +options.hash.from || 0;
    var to = +options.hash.to || context.length;

    for(var i = from; i < to; i += 1) {
        if(filter(context[i])) {
            result.push(options.fn(context[i]));
        }
    }

    if(result.length === 0) {
        return;
    }

    // Only get the first n - 1 items because we want
    // to add a coordinating conjunction before the last item.
    var first = result.slice(0, result.length - 1);

    var conjunction = " and ";
    if(first.length > 1) {
        conjunction = ", " + conjunction;
    }

    return first.join(", ") + conjunction + result[result.length - 1] + ".";
});