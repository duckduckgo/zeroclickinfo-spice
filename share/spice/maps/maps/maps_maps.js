nrj('/js/mapbox/mapbox-1.5.2.js');
nrc('/js/mapbox/mapbox-1.5.2.css');

function ddg_spice_maps_maps(place) {

    // Wait for needed assets.
    var f2 = function() {
        if (!window["L"]) {
            window.setTimeout(f2, 50);
            return;
        }
	DDG.maps.renderMap(place);
    };

    f2();
}