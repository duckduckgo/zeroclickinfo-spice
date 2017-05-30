(function (env) {
    "use strict";

    var initialized = false;

    // the various DOM elements
    var $inputs,
        $currency_input_left,
        $currency_input_right,
        $left_select,
        $right_select,
        $selects,
        $more_link,
        $change_rate;

    var crypto_currencies = [
        // Cryptocurrencies
        { symbol: "BTC", name: "Bitcoin", displayed: true },
        { symbol: "LTC", name: "Litecoin", displayed: true }, 
        { symbol: "FTC", name: "Feathercoin", displayed: true },
        { symbol: "BLK", name: "Blackcoin", displayed: true },
        { symbol: "DASH", name: "Dash", displayed: true },
        { symbol: "DOGE", name: "Dogecoin", displayed: true },
        { symbol: "EMC", name: "Emercoin", displayed: true },
        { symbol: "ETH", name: "Ethereum", displayed: true },
        { symbol: "XMR", name: "Monero", displayed: true },
        { symbol: "PPC", name: "Peercoin", displayed: true },
        { symbol: "XPM", name: "Primecoin", displayed: true },
        { symbol: "RDD", name: "Reddcoin", displayed: true },
        { symbol: "ZEC", name: "Zcash", displayed: true },
    ];

    var fiat_currencies = [
        // Supported fiat currencies
        { symbol: "USD", name: "US Dollar", displayed: true },
        { symbol: "CAD", name: "Canadian Dollar", displayed: true },
        { symbol: "GBP", name: "UK Pound", displayed: true },
        { symbol: "EUR", name: "Euro", displayed: true },
        { symbol: "RUR", name: "Russian Ruble", displayed: true },
        { symbol: "UAH", name: "Ukrainian Hryvnia", displayed: false },
    ]

    var Converter = {

        // The Converters internal state
        fromCurrency: undefined,
        toCurrency: undefined,
        rate: undefined,

        calculateRate: function() {

            if($currency_input_left.val() !== '') {
                var left_input = $currency_input_left.val();
                left_input = left_input.replace(/,/g, '');
                var rightval = parseFloat(left_input) * Converter.rate;
                $currency_input_right.val(
                    rightval.toFixed(8)
                );
            } else {
                $currency_input_right.val("");
            }
        },

        calculateInverseRate: function() {

            if($currency_input_right.val() !== '') {
                var right_input = $currency_input_right.val()
                right_input = right_input.replace(/,/g, '');
                var leftval = parseFloat(right_input) / Converter.rate;
                $currency_input_left.val(
                    leftval.toFixed(8)
                );
            } else {
                $currency_input_left.val("");
            }
        },

        // getRatesFromAPI
        getRatesFromAPI: function() {

            var from = $left_select.val(),
                to = $right_select.val();

            // flip the currencies if the user tries to compare the same symbol
            if (from === to) {
                from = Converter.toCurrency;
                to = Converter.fromCurrency;
                $right_select.val(to);
                $left_select.val(from);
            }

            var endpoint = "https://api.cryptonator.com/api/full/" + from + "-" + to;
            $.get(endpoint, function(payload) {
                Converter.rate = parseFloat(payload.ticker.price);
                Converter.calculateRate();
                Converter.updateMoreAtLink(to, from);
                Converter.updateChangeRate(payload.ticker.change);
            });

        },

        // update more at link
        updateMoreAtLink: function(to, from) {

            var more_href = "https://www.cryptonator.com/rates/" + from + "-" + to;
            $more_link.attr("href", more_href)
        },

        updateChangeRate: function(change) {
            
            var linkcolor;
            $change_rate.text(change);
            (parseFloat(change) >= 0) ? linkcolor = "green" : linkcolor = "red";
            $change_rate.css('color', linkcolor);
        },

    }

    env.ddg_spice_cryptocurrency = function(api_result){

        // if the api doesn't return anything, then bail
        if (!api_result) {
            return Spice.failed('cryptocurrency');
        };

        var ticker = api_result.ticker,
            script = $('[src*="/js/spice/cryptocurrency/"]')[0],
            source = decodeURIComponent($(script).attr("src"));

        if (ticker && ticker.base && ticker.target && ticker.price) {

            // Get amount from original query
            var query = source.match(/\/ticker\/(?:.*)\/(.+)/)[1],
                queryAmount = parseFloat(query),
                // Calculate price, rates, and amounts
                base = ticker.base,
                target = ticker.target,
                price = parseFloat(ticker.price),
                change = ticker.change;
            }
        else {
            Spice.failed('cryptocurrency');
        }

        DDG.require('moment.js', function(){
            Spice.add({
                id: "cryptocurrency",
                name: "Cryptocurrency",
                data: api_result,
                meta: {
                    sourceUrl: 'https://www.cryptonator.com',
                    sourceName: "cryptonator.com",
                    sourceIconUrl: "http://www.cryptonator.com/ui/img/favicon.png",
                    itemType: "Conversions"
                },
                normalize: function(item) {
                    return {
                        amount: queryAmount,
                        convertedAmount: queryAmount * price,
                        cryptoTime: moment(item.ticker.timestamp).format("HH:mm"),
                        cryptoDate: moment(item.ticker.timestamp).format("YYYY-DD-MM")
                    };
                },
                templates: { 
                    detail: Spice.cryptocurrency.detail 
                },
                onShow: function() {

                    // initialize the dom
                    if(!initialized) {
                        // localized jQuery objects
                        var $currency = $("#zci-cryptocurrency");
                        var $crypto_group = $("optgroup.crypto");
                        var $fiat_group = $("optgroup.fiat");

                        // jQuery objects globally accessable
                        $inputs = $("input");
                        $currency_input_left = $currency.find("#zci--cryptocurrency-amount-left");
                        $currency_input_right = $currency.find("#zci--cryptocurrency-amount-right");
                        $left_select = $currency.find("#zci--cryptocurrency-symbol-left");
                        $right_select = $currency.find("#zci--cryptocurrency-symbol-right");
                        $selects = $currency.find("select");
                        $more_link = $currency.find("#zci__more-at a");
                        $change_rate = $currency.find("#js-change-rate");

                        // apends all the currency names to the selects
                        for( var i = 0 ; i < crypto_currencies.length ; i ++ ) {
                            if(crypto_currencies[i].displayed === true) {
                                $crypto_group.append(
                                    "<option value=" 
                                    + crypto_currencies[i].symbol 
                                    + ">"
                                    + crypto_currencies[i].name 
                                    + "</strong> (" 
                                    + crypto_currencies[i].symbol 
                                    + ")" 
                                    + "</option>"
                                );
                            }
                        }

                        // add fiat currencies to the dropdown
                        for( var i = 0 ; i < fiat_currencies.length ; i ++ ) {
                            if(fiat_currencies[i].displayed === true) {
                                $fiat_group.append(
                                    "<option value=" 
                                    + fiat_currencies[i].symbol 
                                    + ">"
                                    + fiat_currencies[i].name 
                                    + "</strong> (" 
                                    + fiat_currencies[i].symbol 
                                    + ")" 
                                    + "</option>"
                                );
                            }
                        }

                        Converter.rate = parseFloat(api_result.ticker.price);

                        // set the correct values by default
                        Converter.fromCurrency = api_result.ticker.base;
                        Converter.toCurrency = api_result.ticker.target;
                        Converter.updateMoreAtLink(Converter.fromCurrency, Converter.toCurrency);
                        Converter.updateChangeRate(api_result.ticker.change);

                        $left_select.val(api_result.ticker.base);
                        $right_select.val(api_result.ticker.target);

                    }

                    // calls the api and resets the converter
                    $selects.change(function() {
                        Converter.getRatesFromAPI();
                    });

                    $inputs.click(function() {
                        this.select();
                    });

                    $currency_input_left.bind('change keyup mousewheel', function() {
                        Converter.calculateRate();
                    })

                    $currency_input_right.bind('change keyup mousewheel', function() {
                        Converter.calculateInverseRate();
                    })

                    initialized = true;

                }
            }); // Spice.add
        }); // DDG.require
    };
}(this));
