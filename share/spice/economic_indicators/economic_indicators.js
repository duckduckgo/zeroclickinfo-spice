(function (env) {
    "use strict";
    function getDataFromAPIResponse(api_response){
        //validate if api response is null
        if(api_response === null || api_response === undefined){
            return null;
        }
        //the root object of api response must be an array of length 2
        if ( !$.isArray(api_response) || api_response.length != 2){
            return null;
        }

        //the object at position 1 in api_response contains an yearwise list of values
        var indicatorValuesByYear = api_response[1];
        
        //check if indicatorValuesByYear is an array
        if( !$.isArray(indicatorValuesByYear) ){
            return null;
        }

        //the year wise list is sorted by most recent year first
        //iterare and get the first result where indicator value is not null
        var indicatorData = null;

        $.each(indicatorValuesByYear,function(index,indicator){

            if(indicator.value != null && indicator.country !== null && indicator.date !== null && indicator.indicator !== null){
                indicatorData = indicator;
                return false; //break

            }
        });

        return indicatorData;
    }

    env.ddg_spice_economic_indicators = function(api_response){

        var indicatorData = getDataFromAPIResponse(api_response);

        if ( indicatorData === null || indicatorData === undefined ) {
            return Spice.failed('economic_indicators');
        }

        // Render the response
        Spice.add({
            id: "economic_indicators",
            // Customize these properties
            name: "Economic Indicator",
            data: indicatorData,
            meta: {
                sourceName: "WorldBank",
                sourceUrl: 'http://data.worldbank.org/country/' + indicatorData.country.value.replace(/[^\w\s]/gi, '').replace(/\W/g, '-')
            },
            templates: {
                group: 'text',
                options: {
                    moreAt: true
                }
            },
            normalize: function(indicatorData){
                
                var indicatorValue = "";
                // if the indicator is per capita income
                if(indicatorData.indicator.value.match(/per capita/gi)){
                      //for seperating number by commas every three digits,uses snippet from http://stackoverflow.com/questions/1990512/add-comma-to-numbers-every-three-digits-using-jquery
                      indicatorValue = indicatorData.value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " USD";
                }
                //else if indicator is growth rate
                else if(indicatorData.indicator.value.match(/growth/gi)){
                      indicatorValue = parseFloat(indicatorData.value).toFixed(2) + " %";
                }
                // else if the indicator is GDP
                else if(indicatorData.indicator.value.match(/GDP/gi)){
                      var indicatorValue = parseFloat(indicatorData.value);
                      if(indicatorValue /1000000000000 > 1){
                        indicatorValue = (indicatorValue/1000000000000).toFixed(2) + " Trillion USD";
                      } else if(indicatorValue/1000000000 > 1){
                        indicatorValue = (indicatorValue/1000000000).toFixed(2) + " Billion USD";
                      } else if(indicatorValue/1000000 > 1){
                        indicatorValue = (indicatorValue/1000000).toFixed(2) + " Million USD";
                      } else {
                        indicatorValue = indicatorValue.toFixed(2) + " USD";
                      }
                }
                return {
                    title : indicatorValue,
                    subtitle : DDG.getProperty(indicatorData,'country.value') + " - " + DDG.getProperty(indicatorData,'indicator.value').replace(/ *\([^)]*\) */g, "") + " (" + DDG.getProperty(indicatorData,'date') + ")" 
                }
            }
        });
    };
}(this));
