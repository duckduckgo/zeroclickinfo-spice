(function(env) {
    env.ddg_spice_thesaurus = function(api_result) {
        "use strict";

        if (!api_result || api_result.error) {
            return Spice.failed("thesaurus");
        }

        // Check if user want to find antonym only
        var searchAntonymOnly = (document.title.indexOf('antonym') > -1);

        // Retrieve the word we did a lookup on
        var script = $('[src*="/js/spice/thesaurus/"]')[0];
        var source = $(script).attr("src");
        var query = source.match(/thesaurus\/([^\/]+)/)[1];
        
        query = decodeURIComponent(query);
        // Search the results for the word type (noun, adjective etc) with the most entries
        var wordTypeWithMostEntries;
        var highestEntryCount = 0;
        var exactWord;

        // constants for types of relationship
        var RELATIONSHIP_TYPE = {
            SYNONYMS : "syn",
            SIMILAR  : "sim",
            RELATED  : "rel",
            ANTONYMS : "ant"
        };

        
        $.each(api_result, function(wordType, words) { // wordType = ajective, noun etc... 
            var wordTypeEntryCount = 0;
            
            $.each(words, function(relationshipType) { // relationshipType = synonym, antonym etc...
                wordTypeEntryCount += words[relationshipType].length;
            });
            
            if (wordTypeEntryCount > highestEntryCount) {
                highestEntryCount = wordTypeEntryCount;
                wordTypeWithMostEntries = wordType;
            }
        });
        
        if (!wordTypeWithMostEntries) {
            return Spice.failed("thesaurus");    
        }
        exactWord = api_result[wordTypeWithMostEntries];
        
        // Can't find any antonym when searching for antonym
        if (searchAntonymOnly && !exactWord.hasOwnProperty(RELATIONSHIP_TYPE.ANTONYMS)) {
            return Spice.failed("thesaurus");
        }

        Spice.add({
            id: 'thesaurus',
            name: 'Thesaurus',
            data:  exactWord,
            templates: {
                group: 'text',
                options:{
                    content: 'record',
                    moreAt: true
                }
            },
            
            meta: {
                sourceName: 'Big Huge Thesaurus',
                sourceUrl:  'http://words.bighugelabs.com/' + query,
            },
            
            normalize: function(words) {
                var result = {
                    title: DDG.capitalize(query),
                    subtitle: DDG.capitalize(wordTypeWithMostEntries),
                    record_keys : [],
                    record_data : {}
                };
                
                // Display any synonyms if present
                if (words.hasOwnProperty(RELATIONSHIP_TYPE.SYNONYMS)) {
                    result.record_keys.push("Synonyms");
                    result.record_data["Synonyms"] = words[RELATIONSHIP_TYPE.SYNONYMS].join(', ');
                }

                // Display any similar words if present
                if (words.hasOwnProperty(RELATIONSHIP_TYPE.SIMILAR)) {
                    result.record_keys.push("Similar");
                    result.record_data["Similar"] = words[RELATIONSHIP_TYPE.SIMILAR].join(', ');
                }

                // Display any related words if present
                if (words.hasOwnProperty(RELATIONSHIP_TYPE.RELATED)) {
                    result.record_keys.push("Related");
                    result.record_data["Related"] = words[RELATIONSHIP_TYPE.RELATED].join(', ');                    
                }

                // Display any antonyms if present
                if (words.hasOwnProperty(RELATIONSHIP_TYPE.ANTONYMS)) {
                    result.record_keys.push("Antonyms");
                    result.record_data["Antonyms"] = words[RELATIONSHIP_TYPE.ANTONYMS].join(', ');
                }
             
                return result;
            }
        });
    }
}(this));
