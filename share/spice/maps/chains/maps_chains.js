// load places since this is a subset
nrj(DDG.get_asset_path('maps/places', 'maps_places.spice.js'));

// the plugin callback by another name
var ddg_spice_maps_chains = function (chains) {
    if (typeof(ddg_spice_maps_places) === 'function') {
	ddg_spice_maps_places(chains);
    }
};

