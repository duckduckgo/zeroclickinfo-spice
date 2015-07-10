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
        
        // setting title and units based on database/dataset string
        result.header = "Price of ";
        if (quandlCode === "OFDP/ALUMINIUM_21") {
            result.header += "Aluminum";
            result.units = "$USD/tonne";
        }
		if (quandlCode === "OFDP/ALUMINIUMALLOY_11") {
            result.header += "Aluminum Alloy";
            result.units = "$USD/tonne";
		}
		if (quandlCode === "DOE/COAL") {
            result.header += "Coal";
            result.units = "$USD/short ton";
		}
		if (quandlCode === "OFDP/COPPER") {
            result.header += "Copper";
            result.units = "$USD/tonne";
		}
		if (quandlCode === "DOE/RWTC") {
            result.header += "Crude Oil";
            result.units = "$USD/barrel";
		}
		if (quandlCode === "DOE/EER_EPMRR_PF4_Y05LA_DPG") {
            result.header += "Gasoline Spot";
            result.units = "$USD/gallon";
		}
		if (quandlCode === "BUNDESBANK/BBK01_WT5511") {
            result.header += "Gold";
            result.units = "$USD/troy oz.";
		}
		if (quandlCode === "ODA/PNGASUS_USD") {
            result.header += "Natural Gas";
            result.units = "$USD/MMBtu";
		}
		if (quandlCode === "LPPM/PALL") {
            result.header += "Palladium";
            result.units = "$USD/troy oz.";
		}
		if (quandlCode === "LPPM/PLAT") {
            result.header += "Platinum";
            result.units = "$USD/troy oz.";
		}
		if (quandlCode === "LBMA/SILVER") {
            result.header += "Silver";
            result.units = "$USD/troy oz.";
		}
		if (quandlCode === "JOHNMATT/IRID") {
            result.header += "Iridium";
            result.units = "$USD/troy oz.";
		}

        // url to the data set page
        result.url = 'https://quandl.com/' + result.source_code + "/" + result.code;

        // add title tag for link:
        result.urlTitle = 'View more data at Quandl';

        var recentValue = result.data[0][1];
        var previousValue = result.data[1][1];

        // month array to make string version of date
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        // adding in the previous date point date
        var fromDate = new Date(result.data[1][0]);
        var fromDateString = months[fromDate.getUTCMonth()] + " " + fromDate.getUTCDate() + ", " + fromDate.getFullYear();
        result.from_date = fromDateString;

        // reformatting the current data point date (to_date)
        var toDate = new Date(result.to_date);
        var toDateString = months[toDate.getUTCMonth()] + " " + toDate.getUTCDate() + ", " + toDate.getFullYear();
        result.to_date = toDateString;

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
            }
        });
    };
}(this));


