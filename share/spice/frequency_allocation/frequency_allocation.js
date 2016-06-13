(function (env) {
    "use strict";
    env.ddg_spice_frequency_allocation = function(api_result) {

        if (!api_result || api_result.status == 'Fail' || api_result.Errors) {
            return Spice.failed('frequency_allocation');
        }
        
        var script = $('[src*="/js/spice/frequency_allocation/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/frequency_allocation\/([^\/]+)/)[1],
            targetFrequency = decodeURIComponent(query);
        
        
        var infoboxData;
        if (targetFrequency >= 3000 && targetFrequency < 30000){
            infoboxData = [{heading: 'ITU assignment'},
                                  {label: "Designation", value: 'Super high frequency (SHF)'},
                                  {label: "Description", value: 'The SHF band is used by microwave ovens, wireless LANs, cell phones, and satellites.'},
                                  {label: "Lower band", value: 3000 + ' MHz'},
                                  {label: "Upper band", value: 30000 + ' MHz'}]     
        } else if(targetFrequency >= 300 && targetFrequency < 3000){
            infoboxData = [{heading: 'ITU assignment'},
                                  {label: "Designation", value: 'Ultra high frequency (UHF)'},
                                  {label: "Description", value: 'The UHF band is used by televisions, cordless phones, cell phones, pagers, walkie-talkies, and satellites.'},
                                  {label: "Lower band", value: 300 + ' MHz'},
                                  {label: "Upper band", value: 3000 + ' MHz'}]
        } else if (targetFrequency >= 30 && targetFrequency < 300){
            infoboxData = [{heading: 'ITU assignment'},
                                  {label: "Designation", value: 'Very high frequency (VHF)'},
                                  {label: "Description", value: 'The VHF band is used by FM broadcasts, televisions, amateur radio, marine communication systems, and air traffic control'},
                                  {label: "Lower band", value: 30 + ' MHz'},
                                  {label: "Upper band", value: 300 + ' MHz'}]    
        }
        
        var lastupdate = api_result.SpectrumBands.lastUpdate;
        Spice.add({
            id: "frequency_allocation",
            name: "Radio frequency",
            data: api_result.SpectrumBands.SpectrumBand,
            meta: {
                sourceName: 'FFC',
                sourceUrl: 'https://www.fcc.gov/'
            },
            normalize: function(item) {
                return {
                    title: item.lowerBand + ' - ' + item.upperBand + ' MHz',
                    subtitle: "Federal frequency allocation",
                    image: 'https://pixabay.com/static/uploads/photo/2014/04/02/10/59/tower-305150_960_720.png',
                    description: item.bandDesc,
                    infoboxData: infoboxData
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
