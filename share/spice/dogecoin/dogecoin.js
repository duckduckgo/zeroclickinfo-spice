function ddg_spice_dogecoin(api_result) {
    "use strict";
 
    if (!api_result.last) {
        return;
    }
 
   function getRates(type){
        var low = 0;
        var high = 0;
        for(var i = 0; i < api_result.orders.length; i++){
			var entry = api_result.orders[i];			if(entry.type === type){
				var temp = parseFloat(entry.rate);
				if(temp > high){
					high = temp;
				}
				if(temp < low || low === 0){
					low = temp;
				}
			}
        }    
        return {high:high,low:low};
    }
    
 
    var buy = {
        price:getRates("buy"),
        title: "BUY"
    };
    var sell = {
        price: getRates("sell"),
        title: "SELL"
    };
    Spice.render({
        header1           : "Dogecoin Exchange Prices (USD)" ,
        spice_name        : "dogecoin",        
        data             : api_result,
        source_url       : 'https://prelude.io',
        source_name      : 'Prelude',
        template_normal  : 'dogecoin',
        force_favicon_url : "https://prelude.io/favicon.ico",
 
        template_frame   : "twopane",
        template_options : {
           left : { template: "dogecoin",data: buy},
           right : { template: "dogecoin",data: sell}
       },
        force_no_fold    : true,
       force_big_header : true
    });
 
}