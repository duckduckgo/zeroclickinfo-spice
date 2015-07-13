/**
* Created with DuckDuckHack.
* User: brianrisk
* Date: 2015-07-10
* Time: 12:00 PM
* To change this template use Tools | Templates.
*/


(function (env) {
    'use strict';
    env.ddg_spice_quandl_commodities = function(api_result){

        if (!api_result) {
            return Spice.failed('quandl_commodities');
        }

        var result = api_result;

        // we need two data points to get percent change
        if (result.data.length < 2) {
            return Spice.failed('quandl_commodities');
        }
        
        var quandlCode = result.source_code + "/" + result.code;
        
        var commodities = {
            "OFDP/ALUMINIUM_21": {
                header: "Aluminium",
                units: "$USD/tonne",
            },
            "OFDP/ALUMINIUMALLOY_11": {
                header: "Aluminium Alloy",
                units: "$USD/tonne",
            },
            "DOE/COAL": {
                header: "Cloal",
                units: "$USD/short ton",
            },
            "OFDP/COPPER": {
                header: "Copper",
                units: "$USD/tonne",
            },
            "DOE/RWTC": {
                header: "Crude Oil",
                units: "$USD/barrel",
            },
            "DOE/EER_EPMRR_PF4_Y05LA_DPG": {
                header: "Gasoline Spot",
                units: "$USD/gallon",
            },
            "BUNDESBANK/BBK01_WT5511": {
                header: "Gold",
                units: "$USD/troy oz.",
            },
            "ODA/PNGASUS_USD": {
                header: "Natural Gas",
                units: "$USD/MMBtu",
            },
            "LPPM/PALL": {
                header: "Palladium",
                units: "$USD/troy oz.",
            },
            "LPPM/PLAT": {
                header: "Platinum",
                units: "$USD/troy oz.",
            },
            "LBMA/SILVER": {
                header: "Silver",
                units: "$USD/troy oz.",
            },
            "JOHNMATT/IRID": {
                header: "Iridium",
                units: "$USD/troy oz.",
            },
        };

        result.header = "Price of " + commodities[quandlCode].header;
        result.units = commodities[quandlCode].units;

        // url to the data set page
        result.url = 'https://quandl.com/' + result.source_code + "/" + result.code;

        // add title tag for link:
        result.urlTitle = 'View more data at Quandl';

        var recentValue = result.data[0][1];
        var previousValue = result.data[1][1];

        // splitting title into header and subheader
        result.subheader = 'Prices';

        // getting rounded percentage
        var percentChange = 10000 * ((recentValue - previousValue) / Math.abs(previousValue));
        percentChange = Math.round(percentChange);
        percentChange /= 100;
        result.change_percent = Math.abs(percentChange);

        // setting style based on change
        if (percentChange > 0) result.changeDirection = 'up';
        if (percentChange < 0) result.changeDirection = 'down';
        if (percentChange == 0) result.changeDirection = 'up';

        // displayed value is the most recent value
        result.value = recentValue;
        
        DDG.require('moment.js', function() {
            Spice.add({
                id: 'quandl_commodities',
                name: 'Commodities',
                data: result,
                meta: {
                    sourceName: 'Quandl',
                    sourceUrl: result.url,
                    sourceIconUrl:  DDG.get_asset_path('quandl/commodities','quandl32x32.png')
                },
                templates: {
                    group: 'base',
                    options: {
                        content: Spice.quandl_commodities.content,
                        moreAt: true
                    }
                },
                normalize: function(data) {
                    return {
                      to_date: moment(data.to_date).format('MMMM Do YYYY')
                    }
                }
            });
        });
    };
}(this));


