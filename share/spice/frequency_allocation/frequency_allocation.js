(function (env) {
    "use strict";
    env.ddg_spice_frequency_allocation = function(api_result) {

        if (!api_result || api_result.status == 'Fail' || api_result.Errors) {
            return Spice.failed('frequency_allocation');
        }
        
        var lastupdate = api_result.SpectrumBands.lastUpdate;
        Spice.add({
            id: "frequency_allocation",
            name: "Answer",
            data: api_result.SpectrumBands.SpectrumBand,
            meta: {
                sourceName: "FFC",
                sourceUrl: 'https://www.fcc.gov/'
            },
            normalize: function(item) {
                return {
                    title: item.lowerBand + ' - ' + item.upperBand + ' MHz',
                    subtitle: 'Electromagnetic wave frequency',
                    image: 'https://pixabay.com/static/uploads/photo/2014/04/02/10/59/tower-305150_960_720.png', // Public domain
                    description: item.bandDesc,
                    infoboxData: [{heading: "Meta"},
                                  {label: "Lower band", value: item.lowerBand + ' MHz'},
                                  {label: "Upper band", value: item.upperBand + ' MHz'},
                                  {label: "Last updated", value: lastupdate}
                                  ]
                };
            },
            templates: {
                group: 'info',
                options: {
                    moreAt: true
                }
            }
        });
    };
}(this));
