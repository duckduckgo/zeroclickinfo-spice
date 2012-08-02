function ddg_spice_forvo(data) {

    if (data.attributes.total != "0") {
        
        nrj("/audiojs/audio.min.js");
        nrj("/audiojs/init.js");

        var langs = { "Abkhazian" : 1, "Adygean" : 1, "Afar" : 1, "Afrikaans" : 1, "Akan" : 1, "Albanian" : 1, "Amharic" : 1, "Ancient Greek" : 1, "Arabic" : 1, "Aragonese" : 1, "Arb&#235;resh" : 1, "Armenian" : 1, "Assamese" : 1, "Assyrian Neo-Aramaic" : 1, "Asturian" : 1, "Avaric" : 1, "Aymara" : 1, "Azerbaijani" : 1, "Balochi" : 1, "Bambara" : 1, "Bardi" : 1, "Bashkir" : 1, "Basque" : 1, "Bavarian" : 1, "Belarusian" : 1, "Bengali" : 1, "Bihari" : 1, "Bislama" : 1, "Bosnian" : 1, "Botlikh" : 1, "Breton" : 1, "Bulgarian" : 1, "Buriat" : 1, "Burmese" : 1, "Burushaski" : 1, "Cantonese" : 1, "Cape Verdean Creole" : 1, "Catalan" : 1, "Cebuano" : 1, "Central Bikolano" : 1, "Chamorro" : 1, "Chechen" : 1, "Cherokee" : 1, "Chichewa" : 1, "Chuvash" : 1, "Cornish" : 1, "Corsican" : 1, "Cree" : 1, "Creek" : 1, "Crimean Tatar" : 1, "Croatian" : 1, "Czech" : 1, "Dagbani" : 1, "Danish" : 1, "Dari" : 1, "Divehi" : 1, "Dutch" : 1, "Dzongkha" : 1, "Emilian" : 1, "English" : 1, "Erzya" : 1, "Esperanto" : 1, "Estonian" : 1, "Eton" : 1, "Ewe" : 1, "Ewondo" : 1, "Faroese" : 1, "Fijian" : 1, "Finnish" : 1, "Flemish" : 1, "Franco-Proven&#231;al" : 1, "French" : 1, "Friulan" : 1, "Fulah" : 1, "Galician" : 1, "Gan Chinese" : 1, "Georgian" : 1, "German" : 1, "Gilaki" : 1, "Greek" : 1, "Guarani" : 1, "Gujarati" : 1, "Haitian" : 1, "Hakka" : 1, "Hassaniyya" : 1, "Hausa" : 1, "Hawaiian" : 1, "Hebrew" : 1, "Herero" : 1, "Hiligaynon" : 1, "Hindi" : 1, "Hiri motu" : 1, "Hmong" : 1, "Hungarian" : 1, "Icelandic" : 1, "Igbo" : 1, "Iloko" : 1, "Indonesian" : 1, "Ingush" : 1, "Interlingua" : 1, "Inuktitut" : 1, "Inupiaq" : 1, "Irish" : 1, "Italian" : 1, "Iwaidja" : 1, "Jamaican Patois" : 1, "Japanese" : 1, "Javanese" : 1, "Jin Chinese" : 1, "Kabardian" : 1, "Kabyle" : 1, "Kalaallisut" : 1, "Kalmyk" : 1, "Kannada" : 1, "Kanuri" : 1, "Karakalpak" : 1, "Kashmiri" : 1, "Kazakh" : 1, "Khasi" : 1, "Khmer" : 1, "Kikuyu" : 1, "Kimbundu" : 1, "Kinyarwanda" : 1, "Kirundi" : 1, "Klingon" : 1, "Komi" : 1, "Kongo" : 1, "Konkani" : 1, "Korean" : 1, "Kotava" : 1, "Krio" : 1, "Kuanyama" : 1, "Kurdish" : 1, "Kutchi" : 1, "Kyrgyz" : 1, "Lakota" : 1, "Lao" : 1, "Latin" : 1, "Latvian" : 1, "Lezgian" : 1, "Ligurian" : 1, "Limburgish" : 1, "Lingala" : 1, "Lithuanian" : 1, "Lombard" : 1, "Low German" : 1, "Lozi" : 1, "Luba-katanga" : 1, "Luganda" : 1, "Luo" : 1, "Lushootseed" : 1, "Luxembourgish" : 1, "Macedonian" : 1, "Mainfr&#228;nkisch" : 1, "Malagasy" : 1, "Malay" : 1, "Malayalam" : 1, "Maltese" : 1, "Mandarin Chinese" : 1, "Manx" : 1, "M&#257;ori" : 1, "Mapudungun" : 1, "Marathi" : 1, "Marshallese" : 1, "Masbate&#241;o" : 1, "Mauritian creole" : 1, "Mazandarani" : 1, "Mbe" : 1, "Meitei" : 1, "Micmac" : 1, "Min Dong" : 1, "Min Nan" : 1, "Minangkabau" : 1, "Mohawk" : 1, "Moksha" : 1, "Mongolian" : 1, "Nahuatl" : 1, "Nauru" : 1, "Navajo" : 1, "Naxi" : 1, "Ndonga" : 1, "Neapolitan" : 1, "Nepal Bhasa" : 1, "Nepali" : 1, "Nogai" : 1, "North ndebele" : 1, "Northern sami" : 1, "Norwegian Bokm&#229;l" : 1, "Norwegian Nynorsk" : 1, "Nuosu" : 1, "N&#448;uu" : 1, "Occitan" : 1, "Ojibwa" : 1, "Okinawan" : 1, "Oriya" : 1, "Oromo" : 1, "Osage" : 1, "Ossetian" : 1, "Ottoman Turkish" : 1, "Palauan" : 1, "Palenquero" : 1, "Pangasinan" : 1, "Panjabi" : 1, "Papiamento" : 1, "Pashto" : 1, "Pennsylvania Dutch" : 1, "Persian" : 1, "Picard" : 1, "Piedmontese" : 1, "Pitjantjatjara" : 1, "Polish" : 1, "Portuguese" : 1, "Pulaar" : 1, "Quechua" : 1, "Quiatoni Zapotec" : 1, "Rapa Nui" : 1, "Romagnol" : 1, "Romani" : 1, "Romanian" : 1, "Romansh" : 1, "Rukiga" : 1, "Russian" : 1, "Rusyn" : 1, "Samoan" : 1, "Sango" : 1, "Sanskrit" : 1, "Sardinian" : 1, "Scots" : 1, "Scottish Gaelic" : 1, "Serbian" : 1, "Serer" : 1, "Shona" : 1, "Shoshoni" : 1, "Sicilian" : 1, "Silesian" : 1, "Sindhi" : 1, "Sinhalese" : 1, "Slovak" : 1, "Slovenian" : 1, "Somali" : 1, "Sotho" : 1, "South Ndebele" : 1, "Spanish" : 1, "Sranan Tongo" : 1, "Sundanese" : 1, "Swabian German" : 1, "Swahili" : 1, "Swati" : 1, "Swedish" : 1, "Swiss German" : 1, "Sylheti" : 1, "Tagalog" : 1, "Tahitian" : 1, "Tajik" : 1, "Tamil" : 1, "Tatar" : 1, "Telugu" : 1, "Tetum" : 1, "Thai" : 1, "Tibetan" : 1, "Tigrinya" : 1, "Tok Pisin" : 1, "Toki Pona" : 1, "Tondano" : 1, "Tonga" : 1, "Tsonga" : 1, "Tswana" : 1, "Tuareg" : 1, "Tundra Nenets" : 1, "Turkish" : 1, "Turkmen" : 1, "Tuscarora" : 1, "Tuvan" : 1, "Twi" : 1, "Udmurt" : 1, "Uighur" : 1, "Ukrainian" : 1, "Upper Sorbian" : 1, "Urdu" : 1, "Uzbek" : 1, "Valencian" : 1, "Venda" : 1, "Venetian" : 1, "Vietnamese" : 1, "V&#245;ro" : 1, "Walloon" : 1, "Welsh" : 1, "Western Frisian" : 1, "Wolof" : 1, "Wu chinese" : 1, "Xhosa" : 1, "Xiang Chinese" : 1, "Yakut" : 1, "Yiddish" : 1, "Yoruba" : 1, "Yucatec Maya" : 1, "Yupik" : 1, "Zazaki" : 1, "Zhuang" : 1, "Zulu" : 1  };
        var words = data.items;

        var wrap = d.createElement("div");
        
        var script = d.createElement("script");
        script.innerHTML = 'audiojs.events.ready(function() { var as = audiojs.createAll(); }) ';

        wrap.appendChild(script);

        out = '';
               
        for (var i = 0; i < 3 && i < words.length; i++){
            var word = words[i];
          
            var container = d.createElement("div");
            YAHOO.util.Dom.addClass(container, 'forvo_container');

            var audio = d.createElement("audio");
            YAHOO.util.Dom.addClass(audio, 'forvo_audio');

            var source_mp3 = d.createElement("source");
            source_mp3.src = word.standard_pronunciation.pathmp3;
            var source_ogg = d.createElement("source");
            source_ogg.src = word.standard_pronunciation.pathogg;
            
            var details_span = d.createElement("span");
            details_span.innerHTML = word.original;
            
            var details = d.createElement("div");
            YAHOO.util.Dom.addClass(details, 'forvo_track_details');
            details.appendChild(details_span);
                        
            audio.appendChild(source_mp3);
            audio.appendChild(source_ogg);
            
            container.appendChild(audio);
            container.appendChild(details);
            
            //YAHOO.util.Dom.setAttribute(audio, "controls", "controls");
            YAHOO.util.Dom.setAttribute(audio, "preload", "auto");
            YAHOO.util.Dom.setAttribute(audio, "autobuffer", "autobuffer");

            wrap.appendChild(container);
        }

        out += wrap.innerHTML

        items = new Array();
        items[0] = new Array();
        items[0]['a'] = out;
        items[0]['h'] = 'Pronunciations by Forvo';
        items[0]['s'] = 'Forvo';
        items[0]['u'] = 'http://www.forvo.com';
        items[0]['f'] = 1;
        items[0]['force_big_header'] = 1;
        nra(items, 0, 1);
    }

    else{
    	var count ++;

    	nrj("http://api.duckduckgo.com/?q=spell%20homacide&format=json&pretty=1&callback=ddg_spice_disasmbiguations");



    }
}

function ddg_spice_disambiguations(data){
	nrj("/js/spice/internal/spelling_disambiguation///")
}

// FLASH FALLBACK?
// <object type="application/x-shockwave-flash" data="http://www.google.com/reader/ui/3523697345-audio-player.swf" width="400" height="27" >
//         <param name="flashvars" value="audioUrl=http://westciv.com/podcasts/youmayknowmypoetry.mp3">
//         <param name="src" value="http://www.google.com/reader/ui/3523697345-audio-player.swf"/>
//         <param name="quality" value="best"/>
// </object>