// load places js since this is a subset
nrj(DDG.get_asset_path('maps/places', 'maps_places.spice.js'));

// wrapper for places
var ddg_spice_maps_chains = function (chains) {
    ddg_spice_maps_places(chains);
};

