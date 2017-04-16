function ddg_spice_dogecoin(api_result) {
    "use strict";

    if (!api_result.last) {
        return;
    }

	
    var usd = {
        price:"$"+api_result.last,
        title: "USD"
    };
    var doge = {
        price: "Ð1",
        title: "Ð"
    };
    Spice.render({
        header1           : "Dogecoin Exchange Prices: (1 DOGE)" ,
        spice_name        : "dogecoin",        
        data             : api_result,
        source_url       : 'https://prelude.io',
        source_name      : 'Prelude',
        template_normal  : 'dogecoin',
        force_favicon_url : "https://prelude.io/favicon.ico",

        template_frame   : "twopane",
        template_options : {
           left : { template: "dogecoin",data: usd},
           right : { template: "dogecoin",data: doge},
       },
        force_no_fold    : true,
       force_big_header : true
    });

}