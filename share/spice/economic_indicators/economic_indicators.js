(function (env) {
    "use strict";
    function getDataFromAPIResponse(api_response){
        //validate if api response is null
        if(api_response === null || api_response === undefined){
            return null;
        }
        //the root object of api response must be an array of length 2
        if (Object.prototype.toString.call( api_response ) !== '[object Array]' || api_response.length != 2){
            return null;
        }

        //the object at position 1 in api_response contains an yearwise list of values
        var indicatorValuesByYear = api_response[1];
        
        //check if indicatorValuesByYear is an array
        if(Object.prototype.toString.call( indicatorValuesByYear ) !== '[object Array]'){
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

        if(indicatorData !== null && indicatorData !== undefined){

            if(indicatorData.indicator.value.match(/GDP/gi)){
                  var indicatorValue = parseFloat(indicatorData.value);
                  if(indicatorValue /1000000000000 > 1){
                    indicatorValue = (indicatorValue/1000000000000).toFixed(2) + " Trillion USD";
                  } else if(indicatorValue/1000000000 > 1){
                    indicatorValue = (indicatorValue/1000000000).toFixed(2) + " Billion USD";
                    indicatorValue = sprintf("%.3f ",indicatorValue/1000000000);
                  } else if(indicatorValue/1000000 > 1){
                    indicatorValue = (indicatorValue/1000000).toFixed(2) + " Million USD";
                  } else {
                    indicatorValue = indicatorValue.toFixed(2) + " USD";
                  }
                  indicatorData.value = indicatorValue;
            }
            if(indicatorData.indicator.value.match(/growth/gi)){
                  indicatorData.value = indicatorData.value + " %";
            }
            if(indicatorData.indicator.value.match(/per capita/gi)){
                  indicatorData.value = indicatorData.value + " USD";
            }
        }

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
                sourceUrl: 'http://data.worldbank.org/indicator/' + indicatorData.indicator.id
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.economic_indicators.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
