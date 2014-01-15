function ddg_spice_maps_directions(directions) {
    nrj('/js/mapbox/mapbox-1.5.2.js');
    nrc('/js/mapbox/mapbox-1.5.2.css');
    DDG.maps.renderDirections(directions);
}
