var ddg_spice_lastfm_events = function(api_result) {
    "use strict";

    // Check if we encountered an error.
    if(api_result.error) {
        return;
    }

    // Display the spice plugin.
    Spice.render({
        data              : api_result,
        force_big_header  : true,
        header1           : "Concerts Near You",
        source_name       : "Last.fm",
        source_url        : "http://www.last.fm/events",
        template_normal   : "lastfm_events"
    });

    $(".zero_click_snippet").attr("style", "margin-left: 0px !important; display: block;");

    var image_proxy = "/iu/?u=";

    var shortenDate = function(date) {
        return date.substr(0, date.lastIndexOf(" "));
    };

    $.getScript("/dist/leaflet.js", function() {
        L.Icon.Default.imagePath = "/dist/images";

        // Initialize the map.
        var map = L.map('map');

        // Tell Leaflet where to get the map tiles.
        L.tileLayer(image_proxy + 'http://{s}.tile.cloudmade.com/2f62ad0b4ba046f2b907b67e2c866fa4/997/256/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy <a href="http://cloudmade.com">CloudMade</a>',
            maxZoom: 18
        }).addTo(map);

        // These variables keep track of the first location on the list.
        var firstLocation = [];
        var firstMarker;

        // Go through each list and attach an onclick listener to each of them.
        $(".location").each(function(index) {
            var lat = $(this).attr("data-lat");
            var lon = $(this).attr("data-long");

            // Add a marker (that blue thing poking the map) to each location.
            var marker = L.marker([lat, lon]).addTo(map);

            // Make sure we save the first location and the first marker.
            if(index === 0) {
                firstLocation = [lat, lon];
                firstMarker = marker;
            }

            // Get the data that we need. These attributes were created by Handlebars.
            var title = $(this).attr("data-title");
            var city = $(this).attr("data-city");
            var street = $(this).attr("data-street");
            var website = $(this).attr("data-website");
            var date = $(this).attr("data-date");
            var name = $(this).attr("data-name")

            // When the marker is clicked, show this HTML.
            marker.bindPopup("<a href='" + website + "'>" + title + "</a><div>at <a href='" + website + "'>" + name + "</a></div><div>" + street + "</div><div>" + shortenDate(date) + "</div>").openPopup();

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

Handlebars.registerHelper("list", function(items, options) {
    var out = "";
    for(var i = 0; i < items.length && i < 3; i += 1) {
        out += options.fn(items[i]);
    }
    return out;
});