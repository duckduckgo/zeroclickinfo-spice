//@xe.com

(function (env) {

    env.ddg_spice_currency = function(api_result) {
    "use strict";

    //do more checks
    if(!api_result || !api_result.conversion || !api_result.topConversions || !api_result.conversion.length || api_result.conversion.length===0 || !api_result.topConversions.length || api_result.topConversions.length===0) {
        Spice.failed('xe_currency');
    }


    var results=[];
   
    var mainConv = api_result.conversion;
    var topCovs = api_result.topConversions;


   //flag the input to get different output
   //if is pair get paris tile layout
     if(mainConv["from-currency-symbol"] != mainConv["to-currency-symbol"]){
        mainConv.isPair= true;
             results.push(mainConv);
     }
     //if is one input currency get single tile ouput
     else{  
             mainConv.isSingle= true;
             mainConv["to-currency-symbol"] = topCovs[0]["to-currency-symbol"];
             mainConv["conversion-rate"] = topCovs[0]["conversion-rate"];
             results.push(mainConv);
                 for(var i = 0; i < topCovs.length; i++) {
                        results.push(topCovs[i]);
               }
     }
    

     //meta variable
     var xeTimeFreq =mainConv["rate-utc-timestamp"].match(/\b\d{4}[-.]\d{2}[-.]\d{2}\s\d{2}\:\d{2}\b/);
     var xeTime = mainConv["rate-frequency"].match(/[^\s]+/).toString().toLowerCase();
     var liveUrl = 'http://www.xe.com/currencyconverter/convert/?Amount=1&From='+ mainConv["from-currency-symbol"]+'&To='+  mainConv["to-currency-symbol"];
    
     //if is mobile passing the value to mainConv
     if(is_mobile){
        mainConv.timeString= xeTimeFreq;
        mainConv.timeFreq=xeTime;
        mainConv.liveUrl= liveUrl;
     }

    var switch_template = function() {
       return ((is_mobile)? Spice.currency.currency_item_mobile : Spice.currency.currency_item);
    };

    var switch_heading = function(){
        return ((is_mobile)? '' :   '<a href="http://www.xe.com">XE.com </a>'+ xeTime +  ' mid-market rate ' +': '+ xeTimeFreq + ' UTC');
    };

    var switch_alMeta = function(){
        return ((is_mobile)? '' :  '<a href="' +  liveUrl +  '">View live rates</a>');
    };


    Spice.add({

        id               : 'currency',
        name             : 'Currency',
        data             : results,
        meta             : {
            heading:  switch_heading(),
            sourceUrl    : "http://www.xe.com",
            sourceName   : 'XE.com',
            altMeta:  switch_alMeta(),
            variableTileWidth: true,
 
        },
        normalize: function(item) {
          return {
            fromCurrencySymbol:item["from-currency-symbol"],
            toCurrencySymbol: item["to-currency-symbol"],
            amount:item["from-amount"],
            convertedAmount: item["converted-amount"],
            rate: item["conversion-rate"],
            inverseRate: item["conversion-inverse"],
            xeUrl: 'http://www.xe.com/currencycharts/?from='+ item["from-currency-symbol"]+'&to='+ item["to-currency-symbol"],     
            fromFlag: 'http://s.xe.com/v2/themes/xe/images/flags/circle/'+ item["from-currency-symbol"].toString().toLowerCase()+'.png',
            toFlag: 'http://s.xe.com/v2/themes/xe/images/flags/circle/'+item["to-currency-symbol"].toString().toLowerCase()+'.png',
          currencyName:item["to-currency-name"]
            };
        },
      
      templates : {
         item:  switch_template(),
        }

    });

 };

}(this)); 

//change font size if number lenght over 10
Handlebars.registerHelper("amountFontSize", function(amount)  {
        "use strict";
        return ((amount.toString().length>10) ? 1.5 : 2);
   });

//round top 10 currency results if number length over 10 
 Handlebars.registerHelper("amountRound", function(amount)  {
        "use strict";
        var round = Math.round(amount*100)/100;
        return ((round.toString().length>10) ? round.toPrecision(8) : round);
    });






