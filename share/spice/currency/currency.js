//@xe.com
function ddg_spice_currency(api_result) {

	"use strict";

	if(!api_result) {
        return;
    }

    var convObj = {};
    var minWidth = 11;

    var round = function(num) {
        var numNum = parseFloat(num);
        
        if (numNum < 1) {
            return numNum.toPrecision(2);
        }
        else if (num.length > 15) {
            return numNum.toPrecision(5);
        }
        var rounded = numNum.toFixed(2);
        if (numNum == parseFloat(rounded)) {
            return num;
        }
        return rounded;
    };

    var test = function(url){
            return url;
    };

    var minWidth = function(w) {
        var width;
        width = (w.length>6) ? 13 : 11;
        return width;
    };

    var amountFontSize = function(s){
        var fontSize;
         fontSize =( s.toString().length>10) ? 1.5 : 2;
         return fontSize;
    }


    var buildConv = function(c) {
        var conversion = {};
        conversion.fromCurrencySymbol = c["from-currency-symbol"];
        conversion.toCurrencySymbol = c["to-currency-symbol"];
        conversion.amount = round(c["from-amount"]);
        conversion.convertedAmount = round(c["converted-amount"]);
        conversion.timestamp = c["rate-utc-timestamp"];
        conversion.ratefrequency = c["rate-frequency"];
        conversion.rate = c["conversion-rate"];
        conversion.inverse = c["conversion-inverse"];
        conversion.currencyName = c["to-currency-name"];
        conversion.xeUrl = 'http://www.xe.com/currencycharts/?from='+conversion.fromCurrencySymbol+'&to='+conversion.toCurrencySymbol;
        conversion.flagWidth = 32;
        conversion.flagHeight = conversion.flagWidth * 0.75;
        conversion.minWidth =minWidth(conversion.amount);
        conversion.amountFontSize = amountFontSize(conversion.convertedAmount);
        return conversion;
    };

    var buildTopConvs = function(a) {
        var conv = {},
        topConvs = [];
        for(var i = 0; i < a.length; i++) {
            conv = buildConv(a[i]);
            topConvs.push(conv);
        }
        return topConvs;
    };


    


    convObj.mainConv = buildConv(api_result.conversion);
    convObj.mainConv.isMain = true;
    convObj.mainConv.timeString = convObj.mainConv.timestamp.match(/\b\d{4}[-.]\d{2}[-.]\d{2}\s\d{2}\:\d{2}\b/);
    convObj.mainConv.timeFreq = convObj.mainConv.ratefrequency.match(/[^\s]+/).toString().toLowerCase();
    convObj.topConvs = buildTopConvs(api_result.topConversions);


    //get different output based on input
    if(convObj.mainConv.fromCurrencySymbol != convObj.mainConv.toCurrencySymbol){
        convObj.mainConv.isPair = true;
        convObj.mainConv.liveUrl = 'http://www.xe.com/currencyconverter/convert/?Amount=1&From='+  convObj.mainConv.fromCurrencySymbol+'&To='+  convObj.mainConv.toCurrencySymbol;
    }
    //if one currency, make it input currency = top 1 currency pair
    else{  convObj.mainConv
            convObj.mainConv.toCurrencySymbol = convObj.topConvs[0].toCurrencySymbol;
            convObj.mainConv.rate = convObj.topConvs[0].rate;
            convObj.mainConv.xeUrl =  'http://www.xe.com/currencycharts/?from='+convObj.mainConv.fromCurrencySymbol+'&to='+ convObj.mainConv.toCurrencySymbol;
            convObj.mainConv.liveUrl = 'http://www.xe.com/currencyconverter/convert/?Amount=1&From='+  convObj.mainConv.fromCurrencySymbol+'&To='+  convObj.mainConv.toCurrencySymbol;
       
    }
    
    //construct the data strcuture differently for desktop and smaller screen view
     if (is_mobile){
        results = convObj;
     }
     else{
        var results = [convObj.mainConv];
        for(var i = 0; i < convObj.topConvs.length; i++) {
            results.push(convObj.topConvs[i]);
        }
    }


    Spice.add({

        id               : 'currency',
        name             : 'Currency',
        data             : results,
        meta             : {
            heading:'<a href="http://www.xe.com">XE.com </a>'+convObj.mainConv.timeFreq +  ' mid-market rate ' +': '+convObj.mainConv.timeString + ' UTC',
            sourceUrl    : "http://www.xe.com",
            sourceName   : 'XE.com',
            altMeta: '<a href="' +  convObj.mainConv.liveUrl +  '">View live rates</a>',
            variableTileWidth: true,
 
        },
        templates        : {
             item: Spice.currency.currency_item,
             detail_mobile:  Spice.currency.currency_item_mobile
        }
    });
}

  


Handlebars.registerHelper("lower", function(str) {
    return str.toLowerCase();
});
