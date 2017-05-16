(function(env) {
    "use strict";

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

    var initialized = false;

    var $currency_input_left,
        $currency_input_right,
        $left_select,
        $right_select,
        $selects;

    // The exchange rate
    var Converter = {
        from_currency: undefined,
        to_currency: undefined,

        // the rates
        rate: undefined,
        inverseRate: undefined,
    }
    
    // Currencies that we don't have flags for.
    var currency2country_extra = {
        "xaf": true,
        "xag": true,
        "xau": true,
        "xbt": true,
        "xcd": true,
        "xdr": true,
        "xof": true,
        "xpd": true,
        "xpf": true,
        "xpt": true,
        "ggp": true,
        "jep": true,
        "sar": true
    };
    
    // Some naming exceptions. For example, "gbp" doesn't map to the "gb" asset.
    // We need this hash so that we know that "gbp" will get the "uk" asset.
    var currency2country_translate = {
        'gb': 'uk'
    };
    
    // Currencies with non-standard decimal points. (Standard is 2 eg. 10.46)
    var decimal_places = {
        "xbt": 8
    };
    
    // Resize the size of the outer container if the content of the inner container
    // overflows.
    function resize() {        
        var resultHeight = $(".zci--currency-result").outerHeight();
        
        if(resultHeight > 65) {
            $(".zci--currency-container").css("height", "9em");
        } else {
            $(".zci--currency-container").css("height", "5em");
        }
    }
    
    // Change the look of the mobile view if the content overflows.
    function resizeMobile() {
        var tileHeight = $(".zci--currency .tile--s").outerHeight();

        if(tileHeight > 155) {
            $(".zci--currency .tile--s").addClass("large").removeClass("small");
        } else {
            $(".zci--currency .tile--s").addClass("small").removeClass("large");
        }
    }
    
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
        Converter.rate = +$(mainConv["conversion-rate"].split(" ")).get(-2);
        Converter.inverseRate = +$(mainConv["conversion-inverse"].split(" ")).get(-2);
        
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
        
        // Get the flag image.
        function currency_image(symbol) {
            symbol = symbol.toLowerCase();
            if(symbol in currency2country_extra) {
                return DDG.get_asset_path('currency', 'assets/' + (DDG.is3x ? '96' : DDG.is2x ? '64' : '32') + '/' + symbol + '.png');
            }
            
            symbol = symbol.slice(0, 2);
            symbol = symbol in currency2country_translate ? currency2country_translate[symbol] : symbol;
            return DDG.settings.region.getLargeIconURL(symbol);
        }
        
        // Add commas to the numbers for display.
        function formatNumber(x, symbol) {
            // Check if the number has a decimal point.
            // If it does, only show the standard number digits after the decimal place for a given currency.
            symbol = symbol.toLowerCase();
            if(/\./.test(x.toString())) {
                var precision = decimal_places[symbol] || 2;
                x = x.toFixed(precision);
            }
        
            return DDG.commifyNumber(x);
        }
        
        var templateObj = {
            detail: Spice.currency.detail,
            detail_mobile: Spice.currency.detail_mobile,
            item: Spice.currency.item,
            item_detail: false
        };
        
        // We need to disable the detail view when we're showing the tiles.
        if(results.length > 1) {
            templateObj.detail = false;
            templateObj.detail_mobile = false;
        }

        function calculateRate() {
            if($currency_input_left.val() !== '') {
                var left_input = $currency_input_left.val()
                var rightval = parseFloat(left_input) * Converter.rate;
                $currency_input_right.val(
                    DDG.commifyNumber(rightval.toFixed(2))
                );
            } else {
                $currency_input_right.val("");
            }
        }

        function calculateInverseRate() {
            if($currency_input_right.val() !== '') {
                var right_input = $currency_input_right.val()
                var leftval = parseFloat(right_input) * Converter.inverseRate;
                $currency_input_left.val(
                    DDG.commifyNumber(leftval.toFixed(2))
                );
            } else {
                $currency_input_left.val("");
            }
        }

        function getRatesFromAPI() {
            var url;
            var response;

            var from = $("select#zci--currency-symbol-left").val();
            var to = $("select#zci--currency-symbol-right").val();
            url = "/js/spice/currency/1/" + from + "/" + to;

            console.log("Getting info from " + url);
            $.getScript(url, function(data) {
                // TODO: Only add the quote if it is unique
                console.log(data);
            })

        }
        
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
                    amount: formatNumber(+item["from-amount"], item["from-currency-symbol"]),
                    convertedAmount: formatNumber(+item["converted-amount"], item["to-currency-symbol"]),
                    rate: item["conversion-rate"],
                    inverseRate: item["conversion-inverse"],
                    xeUrl: 'http://www.xe.com/currencycharts/?from=' + item["from-currency-symbol"] + '&to=' + item["to-currency-symbol"],
                    fromFlag: currency_image(item["from-currency-symbol"]),
                    toFlag: currency_image(item["to-currency-symbol"]),
                    currencyName: item["to-currency-name"],
                    liveUrl: liveUrl,
                    xeTime: xeTime,
                    xeDate: xeDate,
                    moreAtIcon: icon
                };
            },
            templates: templateObj,
            onShow: function() {

                // The desktop template depends on a JS function that manages the
                // size of the container.
                if(!is_mobile) {
                    $(window).on('load', resize);
                    $(window).resize(resize);
                } else {
                    $(window).on('load', resizeMobile);
                    $(window).resize(resizeMobile);
                }

                if(!initialized) {
                    $currency_input_left = $("#zci--currency-amount-left");
                    $currency_input_right = $("#zci--currency-amount-right");
                    $left_select = $("select#zci--currency-symbol-left");
                    $right_select = $("select#zci--currency-symbol-right");
                    $selects = $("select.zci--currency-symbol");

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

                // console.log(DDG.get_asset_path('currency', 'currencyNames.txts'));

                /**
                 * When the user clicks on the field we select
                 */
                $currency_input_left.click(function() {
                    var tmp = $currency_input_left.val().replace(/,/g, '');
                    $currency_input_left.val(tmp);
                    this.select();
                });

                $currency_input_right.click(function() {
                    var tmp = $currency_input_right.val().replace(/,/g, '');
                    $currency_input_right.val(tmp);
                    this.select();
                });

                $currency_input_left.keyup(function(_e) {
                    calculateRate();
                });

                $currency_input_right.keyup(function(_e) {
                    calculateInverseRate();
                });

                $selects.change(function(_e) {
                    getRatesFromAPI();
                });

                // convert on the first pass
                if(!initialized) {
                    calculateRate();
                }

                // set the flag to true... no more set ups
                initialized = true;

            }
        });
    };
}(this));
