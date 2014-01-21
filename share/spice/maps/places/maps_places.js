// execute dependencies immediately on file parse

nrj("/js/mapbox/mapbox-1.5.2.js",1);
nrc("/js/mapbox/mapbox-1.5.2.css",1);


// the plugin callback by another name
var ddg_spice_maps_places = function (places) {

    // sub function where 'places' is always defined
    var f2 = function() {
        console.log("f2");

        // check for the mapbox object
        if (!window["L"]) {
            console.log("no L");

            // wait for it
            window.setTimeout(f2, 50);

            // could check for a max value here
            return;
        }

        console.log("L found, here we go with places: %o", places);

        DDG.maps.renderLocal(places);
    };

    f2();
};

