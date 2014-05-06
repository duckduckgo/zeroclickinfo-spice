// execute dependencies immediately on file parse
nrj("/js/mapbox/mapbox-1.5.2.js",1);
nrc("/js/mapbox/mapbox-1.5.2.css",1);

// the plugin callback by another name
var ddg_spice_maps_chains = function (chains) {

    // sub function where 'chains' is always defined
    var f2 = function() {
        // check for the mapbox object
        if (!window["L"]) {

            // wait for it
            window.setTimeout(f2, 50);

            // could check for a max value here
            return;
        }
        DDG.duckbar.add_local(chains);
    };

    f2();
};

