(function (env) {
    "use strict";

    var parseNumber = function(n) {
        return n.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    var parsePrice = function(n) {
        var s = n.split('.');
        if(s.length == 2)
            return parseNumber(s[0])+"."+s[1];
        else
            return parseNumber(s[0]);
    }

    env.ddg_spice_cryptomarketcap = function(api_result) {

        if (!api_result) {
            return Spice.failed('cryptomarketcap');
        }
        var firstEl = api_result.pop();
        
        if (firstEl['error']) {
            return Spice.failed('cryptomarketcap');
        }

        var priceChange = firstEl['percent_change_24h'],
            priceChDis = "↑  ";
        if(priceChange.substring(0, 1) === "-") {
            priceChange = priceChange.substring(1, priceChange.length);
            priceChDis = "↓ ";
        } 
        priceChDis += priceChange + "%";
        
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
                    img_m: 'https://files.coinmarketcap.com/static/img/coins/128x128/'+firstEl['id']+'.png'
                };
            },
            templates: {
                group: 'info',
                options: {
                    content: "record",
                    moreAt: true,
                    item: "basic_image_item"
                }
            },
            data: {
                record_data: {
                    'title': firstEl['name']+" ("+firstEl['symbol']+")",
                    'Price': parsePrice(firstEl['price_usd'])+" USD     ( "+priceChDis+" )",
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
