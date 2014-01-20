function ddg_spice_maps_places(places) {
    nrj('/js/mapbox/mapbox-1.5.2.js', 1);
    nrc('/js/mapbox/mapbox-1.5.2.css', 1);
    DDG.maps.renderLocal(places);
}
