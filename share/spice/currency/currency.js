(function(env) {
    "use strict";

    /////////////////////////////////////////////////////////////
    //
    // COINBASE CURRENCY CONVERTER
    //
    /////////////////////////////////////////////////////////////

    var initialized = false;

    // We hardcode the currency symbols here for 2 reasons rather than read it in
    // 1. To vastly mitigate the risk of (very probable) runtime errors
    // 2. Slight performance betterment
    var currencies = [
        { symbol: "AED", name: "UAE Dirham"}, 
        { symbol: "AFN", name: "Afghan Afghani"},
        { symbol: "ALL", name: "Albanian Lek"},
        { symbol: "AMD", name: "Armenian Dram"},
        { symbol: "ANG", name: "Netherlands Antillean Guilder"},
        { symbol: "AOA", name: "Angola Kwanza"},
        { symbol: "ARS", name: "Argentine Peso"},
        { symbol: "AUD", name: "Australian Dollar"},
        { symbol: "AWG", name: "Aruban Florin"},
        { symbol: "AZN", name: "Azerbaijanian Manat"},
        { symbol: "BAM", name: "Bosnian Convertible Marka"},
        { symbol: "BBD", name: "Barbadian Dollars"},
        { symbol: "BDT", name: "Bangladesh Taka"},
        { symbol: "BGN", name: "Bulgaria Lev"},
        { symbol: "BHD", name: "Bahraini Dinar"},
        { symbol: "BIF", name: "Burundian Franc"},
        { symbol: "BMD", name: "Bermudian Dollar"},
        { symbol: "BND", name: "Bruneian Dollar"},
        { symbol: "BOB", name: "Bolivian Bolíviano"},
        { symbol: "BRL", name: "Brazilian Real"},
        { symbol: "BSD", name: "Bahamian Dollar"},
        { symbol: "BTC", name: "Bitcoin"},
        { symbol: "BTN", name: "Bhutanese Ngultrum"},
        { symbol: "BWP", name: "Botswana Pula"},
        { symbol: "BYR", name: "Belarusian Ruble"},
        { symbol: "BZD", name: "Belizean Dollar"},
        { symbol: "CAD", name: "Canadian Dollar"},
        { symbol: "CDF", name: "Congolese Franc"},
        { symbol: "CHF", name: "Swiss Franc"},
        { symbol: "CLP", name: "Chilean Peso"},
        { symbol: "CNY", name: "Chinese Yuan"},
        { symbol: "COP", name: "Colombian Peso"},
        { symbol: "CRC", name: "Costa Rican Colon"},
        { symbol: "CUC", name: "Cuban Convertible"},
        { symbol: "CUP", name: "Cuban Peso"},
        { symbol: "CVE", name: "Cape Verdean Escudo"},
        { symbol: "CZK", name: "Czech Koruna"},
        { symbol: "DJF", name: "Djiboutian Franc"},
        { symbol: "DKK", name: "Danish Krone"},
        { symbol: "DOP", name: "Dominican Peso"},
        { symbol: "DZD", name: "Algerian Dinar"},
        { symbol: "EGP", name: "Egyptian Pound"},
        { symbol: "ERN", name: "Eritrean Nakfa"},
        { symbol: "ETB", name: "Ethiopian Birr"},
        { symbol: "EUR", name: "Euro"},
        { symbol: "FJD", name: "Fijian Dollar"},
        { symbol: "FKP", name: "Falkland Island Pound"},
        { symbol: "GBP", name: "Great British Pound"},
        { symbol: "GEL", name: "Georgian Lari"},
        { symbol: "GGP", name: "Guernsey Pound"},
        { symbol: "GHS", name: "Ghanaian Cedi"},
        { symbol: "GIP", name: "Gibraltar Pound"},
        { symbol: "GMD", name: "Gambian Dalasi"},
        { symbol: "GNF", name: "Guinean Franc"},
        { symbol: "GTQ", name: "Guatemalan Quetzal"},
        { symbol: "GYD", name: "Guyanese Dollar"},
        { symbol: "HKD", name: "Hong Kong Dollar"},
        { symbol: "HNL", name: "Honduran Lempira"},
        { symbol: "HRK", name: "Croatian Kuna"},
        { symbol: "HTG", name: "Haitian Gourde"},
        { symbol: "HUF", name: "Hungarian Forint"},
        { symbol: "IDR", name: "Indonesian Rupiah"},
        { symbol: "ILS", name: "Israeli Shekel"},
        { symbol: "IMP", name: "Isle of Man Pound"},
        { symbol: "INR", name: "Indian Rupee"},
        { symbol: "IQD", name: "Iraqi Dinar"},
        { symbol: "IRR", name: "Iranian Rial"},
        { symbol: "ISK", name: "Icelandic Krona"},
        { symbol: "JEP", name: "Jersey Pound"},
        { symbol: "JMD", name: "Jamaican Dollar"},
        { symbol: "JOD", name: "Jordanian Dinar"},
        { symbol: "JPY", name: "Japanese Yen"},
        { symbol: "KES", name: "Kenyan Shilling"},
        { symbol: "KGS", name: "Kyrgyzstani Som"},
        { symbol: "KHR", name: "Cambodian Riel"},
        { symbol: "KMF", name: "Comoran Franc"},
        { symbol: "KPW", name: "North Korean Won"},
        { symbol: "KRW", name: "South Korean Won"},
        { symbol: "KWD", name: "Kuwaiti Dinar"},
        { symbol: "KYD", name: "Caymanian Dollar"},
        { symbol: "KZT", name: "Kazakhstani Tenge"},
        { symbol: "LAK", name: "Laotian Kip"},
        { symbol: "LBP", name: "Lebanese Pound"},
        { symbol: "LKR", name: "Sri Lankan Rupee"},
        { symbol: "LRD", name: "Liberian Dollar"},
        { symbol: "LSL", name: "Basotho Loti"},
        { symbol: "LTL", name: "Lithuanian Litas"},
        { symbol: "LVL", name: "Latvian Lat"},
        { symbol: "LYD", name: "Libyan Dinar"},
        { symbol: "MAD", name: "Moroccan Dirham"},
        { symbol: "MDL", name: "Moldovan Leu"},
        { symbol: "MGA", name: "Malagasy Ariary"},
        { symbol: "MKD", name: "Macedonian Denar"},
        { symbol: "MMK", name: "Burmese Kyat"},
        { symbol: "MNT", name: "Mongolian Tughrik"},
        { symbol: "MOP", name: "Macau Pataca"},
        { symbol: "MRO", name: "Mauritanian Ouguiya"},
        { symbol: "MUR", name: "Mauritian Rupee"},
        { symbol: "MVR", name: "Maldivian Rufiyaa"},
        { symbol: "MWK", name: "Malawian Kwacha"},
        { symbol: "MXN", name: "Mexican Peso"},
        { symbol: "MYR", name: "Malaysian Ringgit"},
        { symbol: "MZN", name: "Mozambican Metical"},
        { symbol: "NAD", name: "Namibian Dollar"},
        { symbol: "NGN", name: "Nigerian Naira"},
        { symbol: "NIO", name: "Nicaraguan Cordoba"},
        { symbol: "NOK", name: "Norwegian Krone"},
        { symbol: "NPR", name: "Nepalese Rupee"},
        { symbol: "NZD", name: "New Zealand Dollar"},
        { symbol: "OMR", name: "Omani Rial"},
        { symbol: "PAB", name: "Panamanian Balboa"},
        { symbol: "PEN", name: "Peruvian Sol"},
        { symbol: "PGK", name: "Papua New Guinean Kina"},
        { symbol: "PHP", name: "Philippine Peso"},
        { symbol: "PKR", name: "Pakistani Rupee"},
        { symbol: "PLN", name: "Polish Zloty"},
        { symbol: "PYG", name: "Paraguayan Guarani"},
        { symbol: "QAR", name: "Qatari Riyal"},
        { symbol: "RON", name: "Romanian New Leu"},
        { symbol: "RSD", name: "Serbian Dinar"},
        { symbol: "RUB", name: "Russian Ruble"},
        { symbol: "RWF", name: "Rwandan Franc"},
        { symbol: "SAR", name: "Saudi Arabian Riyal"},
        { symbol: "SBD", name: "Solomon Islander Dollar"},
        { symbol: "SCR", name: "Seychellois Rupee"},
        { symbol: "SDG", name: "Sudanese Pound"},
        { symbol: "SEK", name: "Swedish Krona"},
        { symbol: "SGD", name: "Singapore Dollar"},
        { symbol: "SHP", name: "Saint Helenian Pound"},
        { symbol: "SLL", name: "Leonean Leone"},
        { symbol: "SOS", name: "Somali Shilling"},
        { symbol: "SPL", name: "Seborgan Luigino"},
        { symbol: "SRD", name: "Surinamese Dollar"},
        { symbol: "STD", name: "Sao Tomean Dobra"},
        { symbol: "SVC", name: "Salvadoran Colon"},
        { symbol: "SYP", name: "Syrian Pound"},
        { symbol: "SZL", name: "Swazi Lilangeni"},
        { symbol: "THB", name: "Thai Baht"},
        { symbol: "TJS", name: "Tajikistani Somoni"},
        { symbol: "TMT", name: "Turkmenistani Manat"},
        { symbol: "TND", name: "Tunisian Dinar"},
        { symbol: "TOP", name: "Tongan Pa'anga"},
        { symbol: "TRY", name: "Turkish Lira"},
        { symbol: "TTD", name: "Trinidadian Dollar"},
        { symbol: "TVD", name: "Tuvaluan Dollar"},
        { symbol: "TWD", name: "Taiwan New Dollar"},
        { symbol: "TZS", name: "Tanzanian Shilling"},
        { symbol: "UAH", name: "Ukrainian Hryvnia"},
        { symbol: "UGX", name: "Ugandan Shilling"},
        { symbol: "USD", name: "US Dollar"},
        { symbol: "UYU", name: "Uruguayan Peso"},
        { symbol: "UZS", name: "Uzbekistani Som"},
        { symbol: "VEB", name: "Venezuelan Bolivar"},
        { symbol: "VEF", name: "Venezuelan Bolivar"},
        { symbol: "VND", name: "Vietnamese Dong"},
        { symbol: "VUV", name: "Ni-Vanuatu Vatu"},
        { symbol: "WST", name: "Samoan Tala"},
        { symbol: "XAG", name: "Silver Ounce"},
        { symbol: "XAU", name: "Gold Ounce"},
        { symbol: "XPD", name: "Palladium Ounce"},
        { symbol: "XPT", name: "Platinum Ounce"},
        { symbol: "YER", name: "Yemeni Rial"},
        { symbol: "ZAR", name: "South African Rand"},
        { symbol: "ZMW", name: "Zambian Kwacha"},
        { symbol: "ZWD", name: "Zimbabwean Dollar"},
    ]

    //
    // The various jQuery objects representing the zci--currency UI
    // 
    var $currency_input_left,
        $currency_input_right,
        $left_select,
        $right_select,
        $selects;
    
    // Currency Converter
    var Converter = {

        from_currency: undefined,
        to_currency: undefined,
        rate: undefined,
        inverseRate: undefined,

        // If there is really small exchange rates, then we need to display the
        // appropriate significate figures. For example HUF -> EUR = 0.0032. However,
        // once the conversion to is high enough (1) we will fall back to 2 sig figs.
        getSignificantFigures: function(rate, value, curr) {

            // if Bitcoin, keep it at 8
            if(curr === "BTC") {
                return 8;
            }

            // else we'll set the decimals based on heuristics
            if(rate <= 0.001 && value < 1) {
                return 6;
            } else if(rate <= 0.01 && value < 1) {
                return 4;
            } else {
                return 2;
            }
        },

        //
        // Calculates the rates
        //

        calculateRate: function() {
            if($currency_input_left.val() !== '') {
                var left_input = $currency_input_left.val();
                left_input = left_input.replace(/,/g, '');
                var rightval = parseFloat(left_input) * Converter.rate;
                var decimals = Converter.getSignificantFigures(Converter.rate, rightval, Converter.to_currency);
                $currency_input_right.val(
                    rightval.toFixed(decimals)
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
                var decimals = Converter.getSignificantFigures(Converter.inverseRate, leftval, Converter.from_currency);
                $currency_input_left.val(
                    leftval.toFixed(decimals)
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

            // gets the conversion rate
            $.ajax({
                url: "/js/spice/currency/1/" + from + "/" + to,
                beforeSend: function( xhr ) {
                    xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
                },
                error: function(request, status, error) {
                    Spice.failed('currency');
                }
            }).done(function(payload) {
                var response = JSON.parse(payload.trim().replace(/^[^\(]*\(/, '').replace(/\);$/, ''));

                Converter.to_currency = to;
                Converter.rate = response.data.rates[to];
                Converter.from_currency = from;
                Converter.inverseRate = 1/response.data.rates[to];
                Converter.calculateRate();
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
        },
    } // Converter

    env.ddg_spice_currency = function(api_result) {

        // Check if there are any errors in the response.
        if(!api_result || !api_result.data || !api_result.data.rates) {
            return Spice.failed('currency');
        }

        // Construct the original api call
        var script = $('[src*="/js/spice/currency/"]')[0],
        source = $(script).attr("src"),
        query = source.match(/currency\/([^\/]+)/)[1];

        // we'll build out what we need
        var split_query = source.split("/");
        var amount = split_query[split_query.length-3];
        Converter.from_currency = split_query[split_query.length-2].toUpperCase();       
        Converter.to_currency = split_query[split_query.length-1].toUpperCase();
        
        Converter.rate = api_result.data.rates[Converter.to_currency];
        Converter.inverseRate = 1/api_result.data.rates[Converter.to_currency];
        var toAmount = amount * Converter.rate;

        Spice.add({
            id: 'currency',
            name: 'Currency',
            data: api_result,
            signal: 'high',
            meta: {
                sourceUrl: "https://www.coinbase.com/",
                sourceName: "Coinbase"
            },
            normalize: function(item) {
                return {
                    amount: amount,
                    toamount: toAmount,
                };
            },
            templates: {
                detail: Spice.currency.detail,
                options: {
                    moreAt: true
                },
            },
            onShow: function() {

                if(!initialized) {

                    var $currency = $("#zci-currency");
                    $currency_input_left = $currency.find("#zci--currency-amount-left");
                    $currency_input_right = $currency.find("#zci--currency-amount-right");
                    $left_select = $currency.find("#zci--currency-symbol-left");
                    $right_select = $currency.find("#zci--currency-symbol-right");
                    $selects = $currency.find("select.zci--currency-symbol");

                    // apends all the currency names to the selects
                    for( var i = 0 ; i < currencies.length ; i ++ ) {
                        $selects.append(
                            "<option value=" 
                            + currencies[i].symbol 
                            + ">"
                            + currencies[i].name 
                            + "</strong> (" 
                            + currencies[i].symbol 
                            + ")" 
                            + "</option>"
                        );
                    }

                    // sets the default
                    $left_select.val(Converter.from_currency);
                    $right_select.val(Converter.to_currency);
                }

                $currency_input_left.bind('change keyup mousewheel', Converter.calculateRate);
                $currency_input_right.bind('change keyup mousewheel', Converter.calculateInverseRate);

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
