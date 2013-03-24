function ddg_spice_in_theaters(rotten) {
	if(rotten.movies.length > 0) {
		var query = DDG.get_query().toLowerCase().split(' ');
		var mpaa;
		var title = 'Currently In Theaters';
		var get_release = false;
		var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

		//Check if the user wants to filter by MPAA rating
		for(var i = 0;i < query.length;i++) {
			if(query[i] === 'r' || query[i] === 'pg' || query[i] === 'pg-13' || query[i] === 'g') {
				mpaa = query[i].toUpperCase();
			}
			if(query[i] === 'opening') {
				title = 'Opening Movies'
				get_release = true;
			}
		}
		var out = '', length, executed = false, more = '', count = 0;
		out += '<div style="movies"><ul>';
		more += out;

		//Get the movies
		for(var i = 0;i < rotten.movies.length;i++) {
			var movie = rotten.movies[i];
			var rating;

			//Check if the movie has ratings
			if (movie.ratings.critics_score === -1) {
				rating = "Not Yet Reviewed";
			} else {
				rating = 'rated ' + movie.ratings.critics_score + '/100';
			}

			//Get cast of the movie
			var starring = '';
			if(movie.abridged_cast.length) {
				starring = ' starring ' + movie.abridged_cast[0].name;
			}

			var hour = 0;
			var min = 0;
			if(movie.runtime) {
				if(movie.runtime >= 60) {
					hour = Math.floor(movie.runtime / 60);
					min = movie.runtime - (hour * 60);
				} else {
					min = String(movie.runtime);
				}
				hour = ', ' + hour + 'hr ';
				min += 'min';
			} else {
				hour = '';
				min = '';
			}

			var release_date = '';
			//Get release date if it is an opening movie query
			if(get_release) {
				if(movie.release_dates.theater) {
					release_date = movie.release_dates.theater.split('-');
					release_date = ', ' + months[Number(release_date[1])-1] + ' ' + release_date[2];
				}
			}

			//Display the movie
			var bullet = '<li title="' + movie.synopsis + '"><a href="' + movie.links.alternate + '" title="' + movie.synopsis + '">'
						+ movie.title +'</a>' + starring + ' ('
						+ movie.mpaa_rating + hour + min + release_date + ') ' 
					 	+ rating
						+ '</li>';

			//Check if MPAA is available
			if(mpaa) {
				if(mpaa === movie.mpaa_rating) {
					count++;
					executed = true;
					//If there are more than 5 items, move to the second array
					if(count > 5) {
						more += bullet;
					} else {
						out += bullet;
					}
				}
			} else {
				count++;
				executed = true;
				if(count > 5) {
					more += bullet;
				} else {
					out += bullet;
				}
			}
		}
		//Check if it returned any results
		if(!executed) {
			return;
		}
		out += '</ul></div>';
		var items = [[],[]];
		items[0]['a'] = out;
		items[0]['h'] = title + check_location();
		items[0]['s'] = 'Rotten Tomatoes';
		items[0]['u'] = 'http://www.rottentomatoes.com/movie/in-theaters/';
		items[0]['force_big_header'] = true;
		items[0]['force_no_fold'] = 1;
		if(rotten.movies[0].posters.profile) {
			items[0]['i'] = rotten.movies[0].posters.profile;
		}
		if(count > 5) {
			more += '</ul></div>';
			items[1]['a'] = more;
			items[1]['t'] = 'More movies...';
			items[1]['s'] = 'Rotten Tomatoes';
			items[1]['u'] = 'http://www.rottentomatoes.com/movie/in-theaters/';
			items[1]['force_big_header'] = true;
			items[1]['force_no_fold'] = 1;
		}
		items
		nra(items);
	}

	function convert_code(code) {
		var countries = {
		    "af": "Afghanistan",
		    "ax": "Åland Islands",
		    "al": "Albania",
		    "dz": "Algeria",
		    "as": "American Samoa",
		    "ad": "Andorra",
		    "ao": "Angola",
		    "ai": "Anguilla",
		    "aq": "Antarctica",
		    "ag": "Antigua And Barbuda",
		    "ar": "Argentina",
		    "am": "Armenia",
		    "aw": "Aruba",
		    "au": "Australia",
		    "at": "Austria",
		    "az": "Azerbaijan",
		    "bs": "Bahamas",
		    "bh": "Bahrain",
		    "bd": "Bangladesh",
		    "bb": "Barbados",
		    "by": "Belarus",
		    "be": "Belgium",
		    "bz": "Belize",
		    "bj": "Benin",
		    "bm": "Bermuda",
		    "bt": "Bhutan",
		    "bo": "Bolivia, Plurinational State Of",
		    "bq": "Bonaire, Sint Eustatius And Saba",
		    "ba": "Bosnia And Herzegovina",
		    "bw": "Botswana",
		    "bv": "Bouvet Island",
		    "br": "Brazil",
		    "io": "British Indian Ocean Territory",
		    "bn": "Brunei Darussalam",
		    "bg": "Bulgaria",
		    "bf": "Burkina Faso",
		    "bi": "Burundi",
		    "kh": "Cambodia",
		    "cm": "Cameroon",
		    "ca": "Canada",
		    "cv": "Cape Verde",
		    "ky": "Cayman Islands",
		    "cf": "Central African Republic",
		    "td": "Chad",
		    "cl": "Chile",
		    "cn": "China",
		    "cx": "Christmas Island",
		    "cc": "Cocos (keeling) Islands",
		    "co": "Colombia",
		    "km": "Comoros",
		    "cg": "Congo",
		    "cd": "Congo, The Democratic Republic Of The",
		    "ck": "Cook Islands",
		    "cr": "Costa Rica",
		    "ci": "Côte D'ivoire",
		    "hr": "Croatia",
		    "cu": "Cuba",
		    "cw": "Curaçao",
		    "cy": "Cyprus",
		    "cz": "Czech Republic",
		    "dk": "Denmark",
		    "dj": "Djibouti",
		    "dm": "Dominica",
		    "do": "Dominican Republic",
		    "ec": "Ecuador",
		    "eg": "Egypt",
		    "sv": "El Salvador",
		    "gq": "Equatorial Guinea",
		    "er": "Eritrea",
		    "ee": "Estonia",
		    "et": "Ethiopia",
		    "fk": "Falkland Islands (malvinas)",
		    "fo": "Faroe Islands",
		    "fj": "Fiji",
		    "fi": "Finland",
		    "fr": "France",
		    "gf": "French Guiana",
		    "pf": "French Polynesia",
		    "tf": "French Southern Territories",
		    "ga": "Gabon",
		    "gm": "Gambia",
		    "ge": "Georgia",
		    "de": "Germany",
		    "gh": "Ghana",
		    "gi": "Gibraltar",
		    "gr": "Greece",
		    "gl": "Greenland",
		    "gd": "Grenada",
		    "gp": "Guadeloupe",
		    "gu": "Guam",
		    "gt": "Guatemala",
		    "gg": "Guernsey",
		    "gn": "Guinea",
		    "gw": "Guinea-bissau",
		    "gy": "Guyana",
		    "ht": "Haiti",
		    "hm": "Heard Island And Mcdonald Islands",
		    "va": "Holy See (vatican City State)",
		    "hn": "Honduras",
		    "hk": "Hong Kong",
		    "hu": "Hungary",
		    "is": "Iceland",
		    "in": "India",
		    "id": "Indonesia",
		    "ir": "Iran, Islamic Republic Of",
		    "iq": "Iraq",
		    "ie": "Ireland",
		    "im": "Isle Of Man",
		    "il": "Israel",
		    "it": "Italy",
		    "jm": "Jamaica",
		    "jp": "Japan",
		    "je": "Jersey",
		    "jo": "Jordan",
		    "kz": "Kazakhstan",
		    "ke": "Kenya",
		    "ki": "Kiribati",
		    "kp": "Korea, Democratic People's Republic Of",
		    "kr": "Korea, Republic Of",
		    "kw": "Kuwait",
		    "kg": "Kyrgyzstan",
		    "la": "Lao People's Democratic Republic",
		    "lv": "Latvia",
		    "lb": "Lebanon",
		    "ls": "Lesotho",
		    "lr": "Liberia",
		    "ly": "Libya",
		    "li": "Liechtenstein",
		    "lt": "Lithuania",
		    "lu": "Luxembourg",
		    "mo": "Macao",
		    "mk": "Macedonia, The Former Yugoslav Republic Of",
		    "mg": "Madagascar",
		    "mw": "Malawi",
		    "my": "Malaysia",
		    "mv": "Maldives",
		    "ml": "Mali",
		    "mt": "Malta",
		    "mh": "Marshall Islands",
		    "mq": "Martinique",
		    "mr": "Mauritania",
		    "mu": "Mauritius",
		    "yt": "Mayotte",
		    "mx": "Mexico",
		    "fm": "Micronesia, Federated States Of",
		    "md": "Moldova, Republic Of",
		    "mc": "Monaco",
		    "mn": "Mongolia",
		    "me": "Montenegro",
		    "ms": "Montserrat",
		    "ma": "Morocco",
		    "mz": "Mozambique",
		    "mm": "Myanmar",
		    "na": "Namibia",
		    "nr": "Nauru",
		    "np": "Nepal",
		    "nl": "Netherlands",
		    "nc": "New Caledonia",
		    "nz": "New Zealand",
		    "ni": "Nicaragua",
		    "ne": "Niger",
		    "ng": "Nigeria",
		    "nu": "Niue",
		    "nf": "Norfolk Island",
		    "mp": "Northern Mariana Islands",
		    "no": "Norway",
		    "om": "Oman",
		    "pk": "Pakistan",
		    "pw": "Palau",
		    "ps": "Palestine, State Of",
		    "pa": "Panama",
		    "pg": "Papua New Guinea",
		    "py": "Paraguay",
		    "pe": "Peru",
		    "ph": "Philippines",
		    "pn": "Pitcairn",
		    "pl": "Poland",
		    "pt": "Portugal",
		    "pr": "Puerto Rico",
		    "qa": "Qatar",
		    "re": "Réunion",
		    "ro": "Romania",
		    "ru": "Russian Federation",
		    "rw": "Rwanda",
		    "bl": "Saint Barthélemy",
		    "sh": "Saint Helena, Ascension And Tristan Da Cunha",
		    "kn": "Saint Kitts And Nevis",
		    "lc": "Saint Lucia",
		    "mf": "Saint Martin (french Part)",
		    "pm": "Saint Pierre And Miquelon",
		    "vc": "Saint Vincent And The Grenadines",
		    "ws": "Samoa",
		    "sm": "San Marino",
		    "st": "Sao Tome And Principe",
		    "sa": "Saudi Arabia",
		    "sn": "Senegal",
		    "rs": "Serbia",
		    "sc": "Seychelles",
		    "sl": "Sierra Leone",
		    "sg": "Singapore",
		    "sx": "Sint Maarten (dutch Part)",
		    "sk": "Slovakia",
		    "si": "Slovenia",
		    "sb": "Solomon Islands",
		    "so": "Somalia",
		    "za": "South Africa",
		    "gs": "South Georgia And The South Sandwich Islands",
		    "ss": "South Sudan",
		    "es": "Spain",
		    "lk": "Sri Lanka",
		    "sd": "Sudan",
		    "sr": "Suriname",
		    "sj": "Svalbard And Jan Mayen",
		    "sz": "Swaziland",
		    "se": "Sweden",
		    "ch": "Switzerland",
		    "sy": "Syrian Arab Republic",
		    "tw": "Taiwan, Province Of China",
		    "tj": "Tajikistan",
		    "tz": "Tanzania, United Republic Of",
		    "th": "Thailand",
		    "tl": "Timor-leste",
		    "tg": "Togo",
		    "tk": "Tokelau",
		    "to": "Tonga",
		    "tt": "Trinidad And Tobago",
		    "tn": "Tunisia",
		    "tr": "Turkey",
		    "tm": "Turkmenistan",
		    "tc": "Turks And Caicos Islands",
		    "tv": "Tuvalu",
		    "ug": "Uganda",
		    "ua": "Ukraine",
		    "ae": "United Arab Emirates",
		    "gb": "United Kingdom",
		    "us": "United States",
		    "um": "United States Minor Outlying Islands",
		    "uy": "Uruguay",
		    "uz": "Uzbekistan",
		    "vu": "Vanuatu",
		    "ve": "Venezuela, Bolivarian Republic Of",
		    "vn": "Viet Nam",
		    "vg": "Virgin Islands, British",
		    "vi": "Virgin Islands, U.s.",
		    "wf": "Wallis And Futuna",
		    "eh": "Western Sahara",
		    "ye": "Yemen",
		    "zm": "Zambia",
		    "zw": "Zimbabwe"
		};
		if(countries[code.toLowerCase()]) {
			return " (" + countries[code.toLowerCase()] + ")";
		}
		return "";
	}

	function check_location() {
		var scripts = document.getElementsByTagName('script'),
            regex,
            match;

        for (var i = 0; i < scripts.length; i += 1) {
            regex = /in_theaters\/(?:in_theaters|opening)\/([A-Za-z]{2})$/;
            match = scripts[i].src.match(regex);

            if (match !== undefined && match !== null) {
            	return convert_code(match[1]);
            }
        }
	}
}

