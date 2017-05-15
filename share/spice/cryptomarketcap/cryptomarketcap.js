(function (env) {
    "use strict";

    var parseNumber = function(n) {
        return n.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    
    env.ddg_spice_cryptomarketcap = function(api_result) {

        
        // Validate the response (customize for your Spice)

        var firstEl = api_result.pop();
        if (!api_result || firstEl['error']) {
            return Spice.failed('cryptomarketcap');
        }
        console.log(firstEl);
        
        var priceChange = firstEl['percent_change_24h'];
        var priceChDis = "+ ";
        if(priceChange.substring(0, 1) === "-") {
            priceChange = priceChange.substring(1, priceChange.length);
            priceChDis = "- &xdtri; &bigtriangledown;"
        } 
        priceChDis += priceChange + "% in 24h";
        
        // Render the response
        Spice.add({
            id: 'cryptomarketcap',
            name: 'Finance',
            meta: {
                sourceName: 'coinmarketcap.com',
                sourceUrl: 'https://coinmarketcap.com/currencies/' + firstEl['id'],
            },
            normalize: function(item) {
                return {
                    title: firstEl['name']+" ("+firstEl['symbol']+")",
                    image: 'https://files.coinmarketcap.com/static/img/coins/128x128/'+firstEl['id']+'.png',
                    img_m: 'https://files.coinmarketcap.com/static/img/coins/128x128/'+firstEl['id']+'.png',
                };
            },
            templates: {
                group: 'info',
                options: {
                    content: "record",
                    moreAt: true,
                    item: "basic_image_item
                }
            },
            data: {
                record_data: {
                    'title': firstEl['name']+" ("+firstEl['symbol']+")",
                    'Price': firstEl['price_usd']+" USD   ("+priceChDis+")",
                    'Market cap': parseNumber(firstEl['market_cap_usd'])+" USD",
                    'Total supply': parseNumber(firstEl['total_supply'])+" "+firstEl['symbol'],
                    'Volume (24h)': parseNumber(firstEl['24h_volume_usd'])+" USD",
                    'Rank': firstEl['rank']
                },
                record_keys: ["Price", "Market cap", "Total supply", "Volume (24h)", "Rank"]
            }
        });
    };
}(this));
