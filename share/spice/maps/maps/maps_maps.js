DDG.require('maps',function(){
    ddg_spice_maps_maps = function(res) {
        if (!res) { return DDG.duckbar.failed('maps_maps'); }

        var response = DDG.localAPI.getMapsResponse(res);

        if (!response || !response.results || !response.results.length) {
            return DDG.duckbar.failed('maps_maps');
        }
        
        return Spice.add({
            data: response.results,
            id: 'maps_maps',
            name: 'maps',
            answerType: 'Maps',
            allowMultipleCalls: true
        });

    };
});
