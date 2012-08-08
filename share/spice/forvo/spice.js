function ddg_spice_forvo(data) {

    if (data.attributes.total != "0") {

	   	nrj("/forvo/jquery.js", true);
        nrj("/forvo/mediaelement-and-player.min.js", true);
        nrj("/forvo/init.js", true);
        

        var words = data.items;

        var wrap = d.createElement("div");
        
        out = '';
               
        for (var i = 0; i < 3 && i < words.length; i++){
            var word = words[i];
          
            var container = d.createElement("div");
            YAHOO.util.Dom.addClass(container, 'forvo_container');

            var audio = d.createElement("audio");
            YAHOO.util.Dom.setAttribute(audio, 'preload', "auto");

            var mp3_source = d.createElement("source");
            mp3_source.src = word.standard_pronunciation.pathmp3 + ".mp3";
            mp3_source.type = "audio/mp3";
            
            var ogg_source = d.createElement("source");
            ogg_source.src = word.standard_pronunciation.pathogg + ".ogg";
            ogg_source.type = "audio/ogg";

            audio.appendChild(mp3_source);
            audio.appendChild(ogg_source);
            
            var details_span = d.createElement("span");
            details_span.innerHTML = word.original;
            
            var details = d.createElement("div");
            YAHOO.util.Dom.addClass(details, 'forvo_track_details');
            details.appendChild(details_span);
            
            container.appendChild(audio);
            container.appendChild(details);

            wrap.appendChild(container);
        }

        out += wrap.innerHTML

        items = new Array();
        items[0] = new Array();
        items[0]['a'] = out;
        items[0]['h'] = 'Pronunciations by Forvo';
        items[0]['s'] = 'Forvo';
        items[0]['u'] = 'http://www.forvo.com/search/' + DDG.get_query();
        items[0]['f'] = 1;
        items[0]['force_big_header'] = 1;
        nra(items, 1, 1);

    } else {
    	var query = '';
    	var replace_words = ["forvo", "pronounce", "in","how", "to", "abkhazian", "adygean", "afar", "afrikaans", "akan", "albanian", "amharic", "ancient greek", "arabic", "aragonese", "arb&#235;resh", "armenian", "assamese", "assyrian neo-aramaic", "asturian", "avaric", "aymara", "azerbaijani", "balochi", "bambara", "bardi", "bashkir", "basque", "bavarian", "belarusian", "bengali", "bihari", "bislama", "bosnian", "botlikh", "breton", "bulgarian", "buriat", "burmese", "burushaski", "cantonese", "cape verdean creole", "catalan", "cebuano", "central bikolano", "chamorro", "chechen", "cherokee", "chichewa", "chuvash", "cornish", "corsican", "cree", "creek", "crimean tatar", "croatian", "czech", "dagbani", "danish", "dari", "divehi", "dutch", "dzongkha", "emilian", "english", "erzya", "esperanto", "estonian", "eton", "ewe", "ewondo", "faroese", "fijian", "finnish", "flemish", "franco-proven&#231;al", "french", "friulan", "fulah", "galician", "gan chinese", "georgian", "german", "gilaki", "greek", "guarani", "gujarati", "haitian", "hakka", "hassaniyya", "hausa", "hawaiian", "hebrew", "herero", "hiligaynon", "hindi", "hiri motu", "hmong", "hungarian", "icelandic", "igbo", "iloko", "indonesian", "ingush", "interlingua", "inuktitut", "inupiaq", "irish", "italian", "iwaidja", "jamaican patois", "japanese", "javanese", "jin chinese", "kabardian", "kabyle", "kalaallisut", "kalmyk", "kannada", "kanuri", "karakalpak", "kashmiri", "kazakh", "khasi", "khmer", "kikuyu", "kimbundu", "kinyarwanda", "kirundi", "klingon", "komi", "kongo", "konkani", "korean", "kotava", "krio", "kuanyama", "kurdish", "kutchi", "kyrgyz", "lakota", "lao", "latin", "latvian", "lezgian", "ligurian", "limburgish", "lingala", "lithuanian", "lombard", "low german", "lozi", "luba-katanga", "luganda", "luo", "lushootseed", "luxembourgish", "macedonian", "mainfr&#228;nkisch", "malagasy", "malay", "malayalam", "maltese", "mandarin chinese", "manx", "m&#257;ori", "mapudungun", "marathi", "marshallese", "masbate&#241;o", "mauritian creole", "mazandarani", "mbe", "meitei", "micmac", "min dong", "min nan", "minangkabau", "mohawk", "moksha", "mongolian", "nahuatl", "nauru", "navajo", "naxi", "ndonga", "neapolitan", "nepal bhasa", "nepali", "nogai", "north ndebele", "northern sami", "norwegian bokm&#229;l", "norwegian nynorsk", "nuosu", "n&#448;uu", "occitan", "ojibwa", "okinawan", "oriya", "oromo", "osage", "ossetian", "ottoman turkish", "palauan", "palenquero", "pangasinan", "panjabi", "papiamento", "pashto", "pennsylvania dutch", "persian", "picard", "piedmontese", "pitjantjatjara", "polish", "portuguese", "pulaar", "quechua", "quiatoni zapotec", "rapa nui", "romagnol", "romani", "romanian", "romansh", "rukiga", "russian", "rusyn", "samoan", "sango", "sanskrit", "sardinian", "scots", "scottish gaelic", "serbian", "serer", "shona", "shoshoni", "sicilian", "silesian", "sindhi", "sinhalese", "slovak", "slovenian", "somali", "sotho", "south ndebele", "spanish", "sranan tongo", "sundanese", "swabian german", "swahili", "swati", "swedish", "swiss german", "sylheti", "tagalog", "tahitian", "tajik", "tamil", "tatar", "telugu", "tetum", "thai", "tibetan", "tigrinya", "tok pisin", "toki pona", "tondano", "tonga", "tsonga", "tswana", "tuareg", "tundra nenets", "turkish", "turkmen", "tuscarora", "tuvan", "twi", "udmurt", "uighur", "ukrainian", "upper sorbian", "urdu", "uzbek", "valencian", "venda", "venetian", "vietnamese", "v&#245;ro", "walloon", "welsh", "western frisian", "wolof", "wu chinese", "xhosa", "xiang chinese", "yakut", "yiddish", "yoruba", "yucatec maya", "yupik", "zazaki", "zhuang", "zulu"];
    	var query_array = DDG.get_query().split(" ");
    	
    	for (var i=0; i < query_array.length; i++){
    		if (replace_words.indexOf(query_array[i]) === -1) {
    			if (query === ''){
    				query += query_array[i]
    			} else {
    				query += "  " + query_array[i];
    			}
    		}

    		console.log(query)
    	}
    	
    	nrj("http://api.duckduckgo.com/?q=spell%20" + encodeURIComponent(query) + "&format=json&pretty=1&callback=handle_ddg_api");
    }
}

function handle_ddg_api(data){
	if (data.AnswerType === "spell" && data.Answer && data.Answer.indexOf("right") === -1 && data.Answer.indexOf("No suggestions") === -1){

		var array = data.Answer.replace(/,/g, "").split("</i>");
		var suggestions = array[1].split(" ");

		var snippet = d.createElement("div");
		snippet.innerHTML = "Sorry, there were no pronunciations for your search. Did you mean to search for one of these?<br>";
		var span = d.createElement("span");

		for (var i=0; i < suggestions.length; i++){
			var anchor = d.createElement("a");
			anchor.innerHTML = suggestions[i];
			anchor.href += "/?q=pronounce%20" + suggestions[i];
			
			span.appendChild(anchor);
			if (i+1 != suggestions.length) {
				span.innerHTML += ", ";
			}
		}

		snippet.appendChild(span);

		items = new Array();
        items[0] = new Array();
        items[0]['a'] = snippet.innerHTML;
        items[0]['h'] = 'Forvo Disambiguations';
        items[0]['s'] = 'Forvo';
        items[0]['u'] = 'http://www.forvo.com/search/' + suggestions[0];
        items[0]['force_big_header'] = 1;
        nra(items, 0, 1);
	}
}
