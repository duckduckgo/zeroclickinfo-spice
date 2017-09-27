DDG.require('maps',function(){
    ddg_spice_maps_maps = function(res) {

        var response = DDG.localAPI.getMapsResponse(res);
        
        return Spice.add({
            data: response.results,
            id: 'maps_maps',
            name: 'maps',
            answerType: 'Maps',
            allowMultipleCalls: true
        });

    };
});
