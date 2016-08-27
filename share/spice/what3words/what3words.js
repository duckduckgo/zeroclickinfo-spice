(function (env) {
    "use strict";
    env.ddg_spice_what3words = function (api_result) {
        if (!api_result) {
            return Spice.failed('what3words');
        }
        else if (api_result.status.code == 300 && api_result.status.message === "Invalid or non-existent 3 word address"){
            // Grab 3 word address from query
            var query = DDG.get_query()
            console.log(query)
            var three_word_re = /[a-z][a-z]+\.[a-z]+\.[a-z]+/;
            var address = query.match(three_word_re)[0]
        }
        else {
            var location =  encodeURIComponent( api_result.geometry.lng + "," + api_result.geometry.lat );
            var success = 'yes'
        }
        
        if (success == 'yes') {
            DDG.require('maps', function () {
                // Call ArcGIS API to get City + Country for location
                $.getJSON('/js/spice/what3words_arcgis/' + location, function(data) {
                    var address_string;
                    if (data && data.address){
                        var address = [];
                        // ArcGIS doesn't always have a City, Region or Country available
                        // e.g. "homing.udder.zooms"
                        if (data.address.City){
                            address.push(data.address.City);
                        }
                        // Skip Region if identical to City
                        if (data.address.Region !== data.address.City) {
                            address.push(data.address.Region);
                        }
                        if (data.address.CountryCode){
                            address.push( getCountryName(data.address.CountryCode) );
                        }
                        if (address.length) {
                            address_string = "near " + address.join(", ");
                        }
                    }
            
                    Spice.add({
                        id: "what3words",
                        name: "Map",
                        data: {
                            name: api_result.words,
                            lat: api_result.geometry.lat,
                            lon: api_result.geometry.lng,
                            displayLatLon: api_result.geometry.lat + ", " + api_result.geometry.lng,
                            address: address_string
                        },
                        model: 'Place',
                        view: 'Map',
                        meta: {
                            zoomLevel: 15,
                            sourceName: "What3Words",
                            sourceUrl: api_result.map
                        },
                        templates: {
                            group: 'map',
                            options: {
                                moreAt: true
                            }
                        }
                });
            }).fail(function() {
                    consose.log("error");
            });
            
        });
        }
        else {
            DDG.require('maps', function () {
                // the object returned when the api cannot match the three word phrase
                $.getJSON('/js/spice/what3words_standard_blend/' + address, function(data) {
                    var item;
                    // built-in flags use 'uk' instead of 'gb' that standardblend uses
                    for (item in data.blends) {
                        if (data.blends[item].country == 'gb'){
                            data.blends[item].country = 'uk'
                        }
                    }
                    Spice.add({
                        id: 'what3words',
                        name: 'Standardblend',
                        model: 'Place',
                        view: 'Places',
                        meta: {
                            itemType: 'suggestions',
                            searchTerm: address
                        },
                        templates: {
                            group: 'text',
                            variants: {
                                tile: 'video'
                            }
                        },
                        data: data.blends,
                        normalize: function(item){
                            return {
                                name: item.words,
                                lat: item.geometry.lat,
                                lon: item.geometry.lng,
                                title: item.words,
                                description: 'near ' + item.place + ', ' + country_map[item.country],
                                displayLatLon: item.geometry.lat + '\xB0, ' + item.geometry.lng + '\xB0',
                                place: item.place,
                                icon: DDG.settings.region.getLargeIconURL(item.country)
                                }
                            }
                        });
                   
                    
                }).fail(function() {
                    console.log("error");
                });
            });
        };
    }
    // Get full country name for given ISO-3166 code
    function getCountryName (code) {
        return country_map[code] || "";
    }

    // ISO-3166 Countries
    // Some names manually shortened (e.g. United States of America, Democratic People's Republic of Korea, etc)
    // source: https://github.com/lukes/ISO-3166-Countries-with-Regional-Codes/blob/master/slim-3/slim-3.json
    var country_map = {
        "AFG": "Afghanistan",
        "ALA": "Åland Islands",
        "ALB": "Albania",
        "DZA": "Algeria",
        "ASM": "American Samoa",
        "AND": "Andorra",
        "AGO": "Angola",
        "AIA": "Anguilla",
        "ATA": "Antarctica",
        "ATG": "Antigua and Barbuda",
        "ARG": "Argentina",
        "ARM": "Armenia",
        "ABW": "Aruba",
        "AUS": "Australia",
        "AUT": "Austria",
        "AZE": "Azerbaijan",
        "BHS": "Bahamas",
        "BHR": "Bahrain",
        "BGD": "Bangladesh",
        "BRB": "Barbados",
        "BLR": "Belarus",
        "BEL": "Belgium",
        "BLZ": "Belize",
        "BEN": "Benin",
        "BMU": "Bermuda",
        "BTN": "Bhutan",
        "BOL": "Bolivia",
        "BES": "Bonaire, Sint Eustatius and Saba",
        "BIH": "Bosnia and Herzegovina",
        "BWA": "Botswana",
        "BVT": "Bouvet Island",
        "BRA": "Brazil",
        "IOT": "British Indian Ocean Territory",
        "BRN": "Brunei Darussalam",
        "BGR": "Bulgaria",
        "BFA": "Burkina Faso",
        "BDI": "Burundi",
        "KHM": "Cambodia",
        "CMR": "Cameroon",
        "CAN": "Canada",
        "CPV": "Cabo Verde",
        "CYM": "Cayman Islands",
        "CAF": "Central African Republic",
        "TCD": "Chad",
        "CHL": "Chile",
        "CHN": "China",
        "CXR": "Christmas Island",
        "CCK": "Cocos (Keeling) Islands",
        "COL": "Colombia",
        "COM": "Comoros",
        "COG": "Congo",
        "COD": "Congo",
        "COK": "Cook Islands",
        "CRI": "Costa Rica",
        "CIV": "Côte d'Ivoire",
        "HRV": "Croatia",
        "CUB": "Cuba",
        "CUW": "Curaçao",
        "CYP": "Cyprus",
        "CZE": "Czech Republic",
        "DNK": "Denmark",
        "DJI": "Djibouti",
        "DMA": "Dominica",
        "DOM": "Dominican Republic",
        "ECU": "Ecuador",
        "EGY": "Egypt",
        "SLV": "El Salvador",
        "GNQ": "Equatorial Guinea",
        "ERI": "Eritrea",
        "EST": "Estonia",
        "ETH": "Ethiopia",
        "FLK": "Falkland Islands (Malvinas)",
        "FRO": "Faroe Islands",
        "FJI": "Fiji",
        "FIN": "Finland",
        "FRA": "France",
        "GUF": "French Guiana",
        "PYF": "French Polynesia",
        "ATF": "French Southern Territories",
        "GAB": "Gabon",
        "GMB": "Gambia",
        "GEO": "Georgia",
        "DEU": "Germany",
        "GHA": "Ghana",
        "GIB": "Gibraltar",
        "GRC": "Greece",
        "GRL": "Greenland",
        "GRD": "Grenada",
        "GLP": "Guadeloupe",
        "GUM": "Guam",
        "GTM": "Guatemala",
        "GGY": "Guernsey",
        "GIN": "Guinea",
        "GNB": "Guinea-Bissau",
        "GUY": "Guyana",
        "HTI": "Haiti",
        "HMD": "Heard Island and McDonald Islands",
        "VAT": "Holy See",
        "HND": "Honduras",
        "HKG": "Hong Kong",
        "HUN": "Hungary",
        "ISL": "Iceland",
        "IND": "India",
        "IDN": "Indonesia",
        "IRN": "Iran",
        "IRQ": "Iraq",
        "IRL": "Ireland",
        "IMN": "Isle of Man",
        "ISR": "Israel",
        "ITA": "Italy",
        "JAM": "Jamaica",
        "JPN": "Japan",
        "JEY": "Jersey",
        "JOR": "Jordan",
        "KAZ": "Kazakhstan",
        "KEN": "Kenya",
        "KIR": "Kiribati",
        "PRK": "North Korea",
        "KOR": "South Korea",
        "KWT": "Kuwait",
        "KGZ": "Kyrgyzstan",
        "LAO": "Lao People's Democratic Republic",
        "LVA": "Latvia",
        "LBN": "Lebanon",
        "LSO": "Lesotho",
        "LBR": "Liberia",
        "LBY": "Libya",
        "LIE": "Liechtenstein",
        "LTU": "Lithuania",
        "LUX": "Luxembourg",
        "MAC": "Macao",
        "MKD": "Macedonia",
        "MDG": "Madagascar",
        "MWI": "Malawi",
        "MYS": "Malaysia",
        "MDV": "Maldives",
        "MLI": "Mali",
        "MLT": "Malta",
        "MHL": "Marshall Islands",
        "MTQ": "Martinique",
        "MRT": "Mauritania",
        "MUS": "Mauritius",
        "MYT": "Mayotte",
        "MEX": "Mexico",
        "FSM": "Micronesia",
        "MDA": "Moldova",
        "MCO": "Monaco",
        "MNG": "Mongolia",
        "MNE": "Montenegro",
        "MSR": "Montserrat",
        "MAR": "Morocco",
        "MOZ": "Mozambique",
        "MMR": "Myanmar",
        "NAM": "Namibia",
        "NRU": "Nauru",
        "NPL": "Nepal",
        "NLD": "Netherlands",
        "NCL": "New Caledonia",
        "NZL": "New Zealand",
        "NIC": "Nicaragua",
        "NER": "Niger",
        "NGA": "Nigeria",
        "NIU": "Niue",
        "NFK": "Norfolk Island",
        "MNP": "Northern Mariana Islands",
        "NOR": "Norway",
        "OMN": "Oman",
        "PAK": "Pakistan",
        "PLW": "Palau",
        "PSE": "Palestine, State of",
        "PAN": "Panama",
        "PNG": "Papua New Guinea",
        "PRY": "Paraguay",
        "PER": "Peru",
        "PHL": "Philippines",
        "PCN": "Pitcairn",
        "POL": "Poland",
        "PRT": "Portugal",
        "PRI": "Puerto Rico",
        "QAT": "Qatar",
        "REU": "Réunion",
        "ROU": "Romania",
        "RUS": "Russian Federation",
        "RWA": "Rwanda",
        "BLM": "Saint Barthélemy",
        "SHN": "Saint Helena",
        "KNA": "Saint Kitts and Nevis",
        "LCA": "Saint Lucia",
        "MAF": "Saint Martin (French part)",
        "SPM": "Saint Pierre and Miquelon",
        "VCT": "Saint Vincent and the Grenadines",
        "WSM": "Samoa",
        "SMR": "San Marino",
        "STP": "Sao Tome and Principe",
        "SAU": "Saudi Arabia",
        "SEN": "Senegal",
        "SRB": "Serbia",
        "SYC": "Seychelles",
        "SLE": "Sierra Leone",
        "SGP": "Singapore",
        "SXM": "Sint Maarten (Dutch part)",
        "SVK": "Slovakia",
        "SVN": "Slovenia",
        "SLB": "Solomon Islands",
        "SOM": "Somalia",
        "ZAF": "South Africa",
        "SGS": "South Georgia and the South Sandwich Islands",
        "SSD": "South Sudan",
        "ESP": "Spain",
        "LKA": "Sri Lanka",
        "SDN": "Sudan",
        "SUR": "Suriname",
        "SJM": "Svalbard and Jan Mayen",
        "SWZ": "Swaziland",
        "SWE": "Sweden",
        "CHE": "Switzerland",
        "SYR": "Syrian Arab Republic",
        "TWN": "Taiwan, Province of China",
        "TJK": "Tajikistan",
        "TZA": "Tanzania",
        "THA": "Thailand",
        "TLS": "Timor-Leste",
        "TGO": "Togo",
        "TKL": "Tokelau",
        "TON": "Tonga",
        "TTO": "Trinidad and Tobago",
        "TUN": "Tunisia",
        "TUR": "Turkey",
        "TKM": "Turkmenistan",
        "TCA": "Turks and Caicos Islands",
        "TUV": "Tuvalu",
        "UGA": "Uganda",
        "UKR": "Ukraine",
        "ARE": "United Arab Emirates",
        "GBR": "UK",
        "USA": "USA",
        "UMI": "United States Minor Outlying Islands",
        "URY": "Uruguay",
        "UZB": "Uzbekistan",
        "VUT": "Vanuatu",
        "VEN": "Venezuela",
        "VNM": "Viet Nam",
        "VGB": "Virgin Islands (British)",
        "VIR": "Virgin Islands (U.S.)",
        "WLF": "Wallis and Futuna",
        "ESH": "Western Sahara",
        "YEM": "Yemen",
        "ZMB": "Zambia",
        "ZWE": "Zimbabwe",
        "ca": "Canada",
        "cn": "China",
        "dk": "Denmark",
        "uk": "England",
        "fr": "France",
        "de": "Germany",
        "it": "Italy",
        "jp": "Japan",
        "kz": "Kazakhstan",
        "nl": "Netherlands",
        "ru": "Russia",
        "sp": "Spain",
        "se": "Sweden",
        "uk": "UK",
        "us": "USA",
        'au': 'Australia',
        'nz': 'New Zealand'
    };
}(this));