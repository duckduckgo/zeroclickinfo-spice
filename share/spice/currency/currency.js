(function(env) {
    "use strict";

    var initialized = false;

    // We hardcode the currency symbols here for 2 reasons rather than read it in
    // 1. To vastly mitigate the risk of (very probable) runtime errors
    // 2. Slight performance betterment
    var currencies = [
        "AED",
        "AFN",
        "ALL",
        "AMD",
        "ANG",
        "AOA",
        "ARS",
        "AUD",
        "AWG",
        "AZN",
        "BAM",
        "BBD",
        "BDT",
        "BGN",
        "BHD",
        "BIF",
        "BMD",
        "BND",
        "BOB",
        "BRL",
        "BSD",
        "BTN",
        "BWP",
        "BYR",
        "BZD",
        "CAD",
        "CDF",
        "CHF",
        "CLP",
        "CNY",
        "COP",
        "CRC",
        "CUC",
        "CUP",
        "CVE",
        "CZK",
        "DJF",
        "DKK",
        "DOP",
        "DZD",
        "EGP",
        "ERN",
        "ETB",
        "EUR",
        "FJD",
        "FKP",
        "GBP",
        "GEL",
        "GGP",
        "GHS",
        "GIP",
        "GMD",
        "GNF",
        "GTQ",
        "GYD",
        "HKD",
        "HNL",
        "HRK",
        "HTG",
        "HUF",
        "IDR",
        "ILS",
        "IMP",
        "INR",
        "IQD",
        "IRR",
        "ISK",
        "JEP",
        "JMD",
        "JOD",
        "JPY",
        "KES",
        "KGS",
        "KHR",
        "KMF",
        "KPW",
        "KRW",
        "KWD",
        "KYD",
        "KZT",
        "LAK",
        "LBP",
        "LKR",
        "LRD",
        "LSL",
        "LTL",
        "LVL",
        "LYD",
        "MAD",
        "MDL",
        "MGA",
        "MKD",
        "MMK",
        "MNT",
        "MOP",
        "MRO",
        "MUR",
        "MVR",
        "MWK",
        "MXN",
        "MYR",
        "MZN",
        "NAD",
        "NGN",
        "NIO",
        "NOK",
        "NPR",
        "NZD",
        "OMR",
        "PAB",
        "PEN",
        "PGK",
        "PHP",
        "PKR",
        "PLN",
        "PYG",
        "QAR",
        "RON",
        "RSD",
        "RUB",
        "RWF",
        "SAR",
        "SBD",
        "SCR",
        "SDG",
        "SEK",
        "SGD",
        "SHP",
        "SLL",
        "SOS",
        "SPL",
        "SRD",
        "STD",
        "SVC",
        "SYP",
        "SZL",
        "THB",
        "TJS",
        "TMT",
        "TND",
        "TOP",
        "TRY",
        "TTD",
        "TVD",
        "TWD",
        "TZS",
        "UAH",
        "UGX",
        "USD",
        "UYU",
        "UZS",
        "VEB",
        "VEF",
        "VND",
        "VUV",
        "WST",
        "XAF",
        "XAG",
        "XAU",
        "XBT",
        "XCD",
        "XDR",
        "XOF",
        "XPD",
        "XPF",
        "XPT",
        "YER",
        "ZAR",
        "ZMK",
        "ZWD",
    ]

    //
    // The various jQuery objects representing the zci--currency UI
    // 
    var $currency_input_left,
        $currency_input_right,
        $left_select,
        $right_select,
        $selects,
        $more_at_link_normal,
        $more_at_link_charts,
        $to_from_label,
        $from_to_label;
    
    // Some naming exceptions. For example, "gbp" doesn't map to the "gb" asset.
    // We need this hash so that we know that "gbp" will get the "uk" asset.
    var currency2country_translate = {
        'gb': 'uk'
    };
    
    // Currencies with non-standard decimal points. (Standard is 2 eg. 10.46)
    var decimal_places = {
        "xbt": 8
    };
    
    // Currency Converter
    var Converter = {

        from_currency: undefined,
        to_currency: undefined,
        rate: undefined,
        inverseRate: undefined,

        //
        // Retrieves conversion info from JSONP payload
        //

        getConversionRate: function(payload) {
            return +$(payload["conversion-rate"].split(" ")).get(-2);
        },

        getInverseConversionRate: function(payload) {
            return +$(payload["conversion-inverse"].split(" ")).get(-2);
        },

        getFromCurrencyName: function(payload) {
            return payload["from-currency-symbol"];
        },

        getToCurrencyName: function(payload) {
            return payload["to-currency-symbol"];
        },

        getConversionLabel: function(payload) {
            return payload["conversion-rate"];
        },

        getInverseConversionLabel: function(payload) {
            return payload["conversion-inverse"]
        },

        //
        // Calculates the rates
        //

        calculateRate: function() {
            if($currency_input_left.val() !== '') {
                var left_input = $currency_input_left.val();
                left_input = left_input.replace(/,/g, '');
                var rightval = parseFloat(left_input) * Converter.rate;
                $currency_input_right.val(
                    DDG.commifyNumber(rightval.toFixed(2))
                );
            } else {
                $currency_input_right.val("");
            }
        },

        calculateInverseRate: function() {
            if($currency_input_right.val() !== '') {
                var right_input = $currency_input_right.val()
                right_input = right_input.replace(/,/g, '');
                var leftval = parseFloat(right_input) * Converter.inverseRate;
                $currency_input_left.val(
                    DDG.commifyNumber(leftval.toFixed(2))
                );
            } else {
                $currency_input_left.val("");
            }
        },

        getRatesFromAPI: function() {

            var from = $left_select.val();
            var to = $right_select.val();

            // We'll flip the currencies if the user tries to compare the same symbol
            if (from === to) {
                from = Converter.to_currency;
                to = Converter.from_currency;
                $right_select.val(to);
                $left_select.val(from);
            }

            var endpoint = "/js/spice/currency/1/" + from + "/" + to;
            $.get(endpoint, function(payload) {

                // jsonp is returned from the API so we have to alter the contents
                var response = JSON.parse(payload.trim().replace(/^[^\(]*\(/, '').replace(/\);$/, ''));
                response = response.conversion;
                Converter.resetConverter(response);

            });
        },

        //
        // Resets the converter based on new info
        //

        resetConverter: function(json) {
            // gets the to/from currencies
            Converter.from_currency = Converter.getFromCurrencyName(json);
            Converter.to_currency = Converter.getToCurrencyName(json);
            
            // gets the conversion rates
            Converter.rate = Converter.getConversionRate(json)
            Converter.inverseRate = Converter.getInverseConversionRate(json);

            Converter.calculateRate();
            Converter.setMoreAtLinks();

            var conv1 = Converter.getConversionLabel(json);
            var conv2 = Converter.getInverseConversionLabel(json);
            Converter.setInformationLabels(conv1, conv2);
        },

        //
        // Sets Link / Information Labels
        //

        setInformationLabels: function(conv1, conv2) {
            $to_from_label.text(conv1);
            $from_to_label.text(conv2);
        },

        setMoreAtLinks: function() {
            // the url strings
            var more_at_url = "https://www.xe.com/currencyconverter/convert/?Amount=1&From=" + Converter.from_currency + "&To=" + Converter.to_currency;
            var chart_url = "https://www.xe.com/currencycharts/?from=" + Converter.from_currency + "&to=" + Converter.to_currency;
            $more_at_link_normal.attr("href", more_at_url);
            $more_at_link_charts.attr("href", chart_url);
        },

    } // Converter

    env.ddg_spice_currency = function(api_result) {

        // Check if there are any errors in the response.
        if(!api_result || !api_result.conversion || !api_result.topConversions || 
           !api_result.conversion || Object.keys(api_result.conversion).length === 0 || 
           !api_result.topConversions.length || api_result.topConversions.length === 0) {
            return Spice.failed('currency');
        }

        var results = [];
        var mainConv = api_result.conversion;
        var topCovs = api_result.topConversions;
        var templates = {};

        // caches the retrieved information in the UI
        Converter.rate = Converter.getConversionRate(mainConv)
        Converter.inverseRate = Converter.getInverseConversionRate(mainConv);
        
        if(mainConv["from-currency-symbol"] !== mainConv["to-currency-symbol"]) {
            // Flag the input to get different output
            // if is pair get paris tile layout
            results = [mainConv];
        } else {
            // Mark which item is the first one.
            // Since HandlebarsJS (with the way we use them) is unaware of the current index.
            mainConv.initial = true;
            results.push(mainConv);
            
            for(var i = 0; i < topCovs.length; i++) {
                results.push(topCovs[i]);
            }
        }
        
        // Format the time and date.
        var timestr = mainConv["rate-utc-timestamp"].split(/\s+/);
        var xeDate = timestr[0];
        var xeTime = timestr[1].match(/\d{2}\:\d{2}\b/);
        var liveUrl = 'http://www.xe.com/currencyconverter/convert/?Amount=1&From=' + mainConv["from-currency-symbol"] + '&To=' + mainConv["to-currency-symbol"];

        var templateObj = {
            detail: Spice.currency.detail,
            item: Spice.currency.item,
            item_detail: false
        };
        
        // Set favicon
        var icon = ((DDG.is3x || DDG.is2x) ? DDG.get_asset_path('currency',"assets/xe.png") : "http://www.xe.com/favicon.ico");
        
        Spice.add({
            id: 'currency',
            name: 'Currency',
            data: results,
            signal: 'high',
            meta: {
                sourceUrl: "http://www.xe.com",
                sourceName: "xe.com",
                itemType: "Conversions"
            },
            normalize: function(item) {
                // Return null if the results aren't numbers.
                if(!DDG.isNumber(+item["from-amount"]) || !DDG.isNumber(+item["converted-amount"])) {
                    return null;
                }

                Converter.from_currency = item["from-currency-symbol"];
                Converter.to_currency = item["to-currency-symbol"];
                
                return {
                    fromCurrencySymbol: item["from-currency-symbol"],
                    toCurrencySymbol: item["to-currency-symbol"],
                    amount: +item["from-amount"],
                    convertedAmount: +item["converted-amount"],
                    rate: item["conversion-rate"],
                    inverseRate: item["conversion-inverse"],
                    xeUrl: 'http://www.xe.com/currencycharts/?from=' + item["from-currency-symbol"] + '&to=' + item["to-currency-symbol"],
                    currencyName: item["to-currency-name"],
                    liveUrl: liveUrl,
                    xeTime: xeTime,
                    xeDate: xeDate,
                    moreAtIcon: icon
                };
            },
            templates: templateObj,
            onShow: function() {

                if(!initialized) {
                    var $currency = $("#zci-currency");
                    $currency_input_left = $currency.find("#zci--currency-amount-left");
                    $currency_input_right = $currency.find("#zci--currency-amount-right");
                    $left_select = $currency.find("select#zci--currency-symbol-left");
                    $right_select = $currency.find("select#zci--currency-symbol-right");
                    $selects = $currency.find("select.zci--currency-symbol");
                    $more_at_link_normal = $currency.find(".zci__more-at");
                    $more_at_link_charts = $currency.find(".zci__more-at--info");
                    $to_from_label = $currency.find("#to-from-label");
                    $from_to_label = $currency.find("#from-to-label");

                    // apends all the currency names to the selects
                    for( var i = 0 ; i < currencies.length ; i ++ ) {
                        $selects.append(
                            "<option value=" + 
                            currencies[i] + 
                            ">" + 
                            currencies[i] +
                            "</option>"
                        );
                    }

                    // sets the default
                    $left_select.val(Converter.from_currency);
                    $right_select.val(Converter.to_currency);
                }

                /**
                 * When the user clicks on the field we select
                 */
                $currency_input_left.click(function(_e) {
                    var tmp = $currency_input_left.val().replace(/,/g, '');
                    $currency_input_left.val(tmp);
                });

                $currency_input_right.click(function(_e) {
                    var tmp = $currency_input_right.val().replace(/,/g, '');
                    $currency_input_right.val(tmp);
                });

                $currency_input_left.keyup(function(e) {
                    Converter.calculateRate();
                });

                $currency_input_right.keyup(function(_e) {
                    Converter.calculateInverseRate();
                });

                $selects.change(function(_e) {
                    Converter.getRatesFromAPI();
                });

                // Perform conversion on the first pass
                if(!initialized) {
                    Converter.calculateRate();
                    initialized = true;
                }

            }
        });
    };
}(this));
