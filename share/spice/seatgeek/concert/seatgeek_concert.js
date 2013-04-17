var ddg_spice_seatgeek_concert = function(api_result) {
    Spice.render({
        data              : api_result,
        header1           : "Concerts Nearby (SeatGeek)",
        force_big_header  : true,
        source_name       : "SeatGeek",
        source_url        : "http://seatgeek.com/",
        template_normal   : "seatgeek_concert"
    });

    $(".zero_click_snippet").attr("style", "margin-left: 0px !important; display: block;");

    var image_proxy = "/iu/?u=";

    // Load Leaflet.js.
    $.getScript("/dist/leaflet.js", function() {
        // Point to the icons folder.
        L.Icon.Default.imagePath = "/dist/images";

        // Initialize the map.
        var map = L.map('map');

        // Tell Leaflet where to get the map tiles.
        L.tileLayer('http://{s}.tile.cloudmade.com/2f62ad0b4ba046f2b907b67e2c866fa4/997/256/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy <a href="http://cloudmade.com">CloudMade</a>',
            maxZoom: 18
        }).addTo(map);

        // These variables keep track of the first location on the list.
        var firstLocation = [];
        var firstMarker;

        // Go through each list and attach an onclick listener to each of them.
        $(".location").each(function(index) {
            var lat = $(this).attr("data-lat");
            var lon = $(this).attr("data-lon");

            // Add a marker (that blue thing poking the map) to each location.
            var marker = L.marker([lat, lon]).addTo(map);

            // Make sure we save the first location and the first marker.
            if(index === 0) {
                firstLocation = [lat, lon];
                firstMarker = marker;
            }

            // Get the data stored in the anchor tag.
            var city = $(this).attr("data-city");
            var title = $(this).attr("data-title");
            var location = $(this).attr("data-location");
            var address = $(this).attr("data-address");
            var venue = $(this).attr("data-venue");
            var venue_url = $(this).attr("data-venue-url");
            var url = $(this).attr("data-url");
            var title = $(this).attr("data-title");

            // When the marker is clicked, show this HTML.
            marker.bindPopup("<div><a href='" + url + "'>" + title + "</a></div><div><a href='" + venue_url + "'>" + venue + "</a></div><div>" + location + "</div><div>" + address + "</div>").openPopup();

            // When the link from the list is clicked, show the appropriate marker.
            $(this).on("click", function() {
                (function(location) {
                    // Move to that location.
                    map.setView(location, 13);
                    // Show the relevant information.
                    marker.openPopup();
                })([lat, lon], marker);
            });
        });

        // We show the first location on the map.
        map.setView(firstLocation, 13);
        firstMarker.openPopup();
    });
};

// Make sure we only display three venues.
Handlebars.registerHelper("list", function(items, options) {
    var out = "";
    for(var i = 0; i < items.length && i < 3; i += 1) {
        out += options.fn(items[i]);
    }
    return out;
});

Handlebars.registerHelper("checkPrice", function(price, options) {
    if(price) {
        return options.fn({average_price: price});
    }
});