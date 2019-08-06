(function (env) {
    "use strict";

    var initialized = false; // flag used for setting up ia ui

    // the various DOM elements
    var $inputs,
        $currency_input_left,
        $currency_input_right,
        $left_select,
        $right_select,
        $selects,
        $more_link,
        $change_rate;

    // Cryptocurrencies (For Selects)
    var crypto_currencies = [

        { symbol: "BCC", name: "Bitcoin Cash" },
        { symbol: "BTC", name: "Bitcoin" },
        { symbol: "LTC", name: "Litecoin" },
        { symbol: "FTC", name: "Feathercoin" },
        { symbol: "BLK", name: "Blackcoin" },
        { symbol: "DASH", name: "Dash" },
        { symbol: "DOGE", name: "Dogecoin" },
        { symbol: "EMC", name: "Emercoin" },
        { symbol: "ETH", name: "Ethereum" },
        { symbol: "XMR", name: "Monero" },
        { symbol: "NMC", name: "Namecoin" },
        { symbol: "PPC", name: "Peercoin" },
        { symbol: "XPM", name: "Primecoin" },
        { symbol: "RDD", name: "Reddcoin" },
        { symbol: "ZEC", name: "Zcash" },
    ];

    // Supported fiat currencies (For Selects)
    var fiat_currencies = [

        { symbol: "USD", name: "US Dollar" },
        { symbol: "CAD", name: "Canadian Dollar" },
        { symbol: "GBP", name: "UK Pound" },
        { symbol: "EUR", name: "Euro" },
        { symbol: "JPY", name: "Japanese Yen" },
        { symbol: "RUR", name: "Russian Ruble" },
        { symbol: "UAH", name: "Ukrainian Hryvnia" },
    ]

    var Converter = {

        // The Converters internal state
        fromCurrency: undefined,
        toCurrency: undefined,
        rate: undefined,
        cryptoList: [],

        calculateRate: function() {

            if($currency_input_left.val() !== '') {
                var left_input = $currency_input_left.val();
                left_input = left_input.replace(/,/g, '');
                var rightval = parseFloat(left_input) * Converter.rate;
                var numSigDigs = Converter
                    .getSignificantDigits(Converter.toCurrency);
                var rightValInt = Math.floor(rightval);
                var rightValFrac = rightval % 1;

                $currency_input_right.val(
                    rightValInt.toString() +
                    rightValFrac.toPrecision(numSigDigs).substring(1)
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
                var numSigDigs = Converter
                    .getSignificantDigits(Converter.fromCurrency);
                var leftValInt = Math.floor(leftval);
                var leftValFrac = leftval % 1;

                $currency_input_left.val(
                    leftValInt.toString() +
                    leftValFrac.toPrecision(numSigDigs).substring(1)
                );
            } else {
                $currency_input_left.val("");
            }
        },

        //
        // Makes a fresh API call and populates the converter object
        //
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
            
            Converter.toCurrency = to;
            Converter.fromCurrency = from;

            var endpoint = "/js/spice/cryptonator/" + from + "/" + to;

            $.getJSON(endpoint, function(payload) {
                var response = payload;
                Converter.rate = parseFloat(response.ticker.price);
                Converter.calculateRate();
                Converter.updateMoreAtLink(to, from);
                Converter.updateChangeRate(response.ticker.change);
            });
        },

        //
        // Update 'More at' hyperlink
        //
        updateMoreAtLink: function(to, from) {

            var more_href = "https://www.cryptonator.com/rates/" + from + "-" + to;
            $more_link.attr("href", more_href)
        },

        //
        // Update Change (Price Movement) link
        //
        updateChangeRate: function(change) {

            var linkcolor;
            $change_rate.text(change);
            (parseFloat(change) >= 0) ? linkcolor = "#5b9e4d" : linkcolor = "#de5833";
            $change_rate.css('color', linkcolor);
        },


        // Builds the list of cryptocurrencies for local use
        generateCryptoList: function() {
            for (var i = crypto_currencies.length - 1; i >= 0; i--) {
                Converter.cryptoList.push(crypto_currencies[i].symbol);
            };
        },

        // returns the amount of sig figs we need for a number.
        // crypto = 8, fiat = 2
        getSignificantDigits: function(currency) {
            if($.inArray(currency, Converter.cryptoList) > -1) {
                return 8;
            } else {
                return 2;
            }
        },
    }

    env.ddg_spice_cryptocurrency = function(api_result){

        // if the api doesn't return anything, then bail
        if (!api_result
            && !api_result.ticker
            && !api_result.ticker.base
            && !api_result.ticker.target
            && !api_result.ticker.price) {
            return Spice.failed('cryptocurrency');
        };

        var ticker = api_result.ticker,
            script = $('[src*="/js/spice/cryptocurrency/"]')[0],
            source = decodeURIComponent($(script).attr("src"));

        // Get amount from original query
        var query = source.match(/\/ticker\/(?:.*)\/(.+)/)[1],
            queryAmount = parseFloat(query),
            // Calculate price, rates, and amounts
            base = ticker.base,
            target = ticker.target,
            price = parseFloat(ticker.price),
            change = ticker.change;

        // seed the object with list of cryptos
        Converter.generateCryptoList();

        DDG.require('moment.js', function(){
            Spice.add({
                id: "cryptocurrency",
                name: "Cryptocurrency",
                signal: "high",
                data: api_result,
                meta: {
                    sourceUrl: 'https://www.cryptonator.com',
                    sourceName: "cryptonator.com",
                    sourceIconUrl: "http://www.cryptonator.com/ui/img/favicon.png",
                    itemType: "Conversions"
                },
                normalize: function(item) {
                    var val = queryAmount * price;
                    var numSigDigs = Converter.getSignificantDigits(target);
                    var valInt = Math.floor(val);
                    var valFrac = val % 1;

                    return {
                        amount: queryAmount,
                        convertedAmount: valInt.toString() +
                            valFrac.toPrecision(numSigDigs).substring(1),
                        cryptoTime: moment(item.ticker.timestamp).format("HH:mm"),
                        cryptoDate: moment(item.ticker.timestamp).format("YYYY-MM-DD")
                    };
                },
                templates: {
                    detail: Spice.cryptocurrency.detail
                },
                onShow: function() {

                    // initialize the cryptocurrency ui
                    if(!initialized) {
                        // localized jQuery objects
                        var $currency = $("#zci-cryptocurrency");
                        var $crypto_group = $("optgroup.crypto");
                        var $fiat_group = $("optgroup.fiat");

                        // jQuery objects globally accessable
                        $inputs = $currency.find("input");
                        $currency_input_left = $currency.find("#zci--cryptocurrency-amount-left");
                        $currency_input_right = $currency.find("#zci--cryptocurrency-amount-right");
                        $left_select = $currency.find("#zci--cryptocurrency-symbol-left");
                        $right_select = $currency.find("#zci--cryptocurrency-symbol-right");
                        $selects = $currency.find("select");
                        $more_link = $currency.find("#zci__more-at a");
                        $change_rate = $currency.find(".js-change-rate");

                        var primaryText = "name";
                        var secondaryText = "symbol";

                        if (DDG.device.isMobile || DDG.device.isMobileDevice){
                            primaryText = "symbol";
                            secondaryText = "name";
                        }

                        // apends all the currency names to the selects
                        for( var i = 0 ; i < crypto_currencies.length ; i ++ ) {
                            $('<option>', {
                                value: crypto_currencies[i].symbol,
                                text: crypto_currencies[i][primaryText] + " (" + crypto_currencies[i][secondaryText] + ")"
                            }).appendTo($crypto_group);
                        }

                        // add fiat currencies to the dropdown as well for convenience
                        for( var i = 0 ; i < fiat_currencies.length ; i ++ ) {
                            $('<option>', {
                                value: fiat_currencies[i].symbol,
                                text: fiat_currencies[i][primaryText] + " (" + fiat_currencies[i][secondaryText] + ")"
                            }).appendTo($fiat_group);
                        }

                        // Set up the converter object
                        Converter.rate = parseFloat(price);
                        Converter.fromCurrency = base;
                        Converter.toCurrency = target;
                        Converter.updateMoreAtLink(Converter.toCurrency, Converter.fromCurrency);
                        Converter.updateChangeRate(api_result.ticker.change);

                        // set the selects with the correct initial value
                        $left_select.val(api_result.ticker.base);
                        $right_select.val(api_result.ticker.target);

                    }

                    // calls the api and resets the converter
                    $selects.change(function() {
                        Converter.getRatesFromAPI();
                    });

                    // if a user clicks on an intput, we'll update it
                    $inputs.click(function() {
                        this.select();
                    });

                    $currency_input_left.bind('change keyup mousewheel', function() {
                        Converter.calculateRate();
                    })

                    $currency_input_right.bind('change keyup mousewheel', function() {
                        Converter.calculateInverseRate();
                    })

                    // set to true so we don't set up the ui again
                    initialized = true;

                }
            }); // Spice.add
        }); // DDG.require
    };
}(this));
