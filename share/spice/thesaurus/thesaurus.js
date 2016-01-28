(function(env) {
    env.ddg_spice_thesaurus = function(api_result) {
        "use strict";

        if (!api_result || api_result.error) {
            return Spice.failed("thesaurus");
        }

        // Retrieve the word we did a lookup on
        var script = $('[src*="/js/spice/thesaurus/"]')[0];
        var source = $(script).attr("src");
        var query = source.match(/thesaurus\/([^\/]+)/)[1];
        query = decodeURIComponent(query);
        
        // Search the results for the word type (noun, adjective etc) with the most entries
        var wordTypeWithMostEntries;
        var largestWordTypeEntryTotal = 0;
        
        Object.keys(api_result).forEach(function(wordType) { // wordType = ajective, noun etc...
            var wordTypeEntryTotal = 0;

            Object.keys(api_result[wordType]).forEach(function(relationshipType) { // relationshipType = synonym, antonym etc...
                wordTypeEntryTotal += Object.keys(api_result[wordType][relationshipType]).length;
            });

            if (wordTypeEntryTotal > largestWordTypeEntryTotal) {
                largestWordTypeEntryTotal = wordTypeEntryTotal;
                wordTypeWithMostEntries = wordType;
            }
        });
        
        if (!wordTypeWithMostEntries) {
            return Spice.failed("thesaurus");    
        }

        Spice.add({
            id: 'thesaurus',
            name: 'Thesaurus',
            data:  api_result[wordTypeWithMostEntries],
            templates: {
                group: 'list',
                options:{
                    content: 'record', 
                    rowHighlight : true,
                    moreAt: true
                }
            },
            
            meta: {
                sourceName:  'Big Huge Thesaurus',
                sourceUrl:  'http://words.bighugelabs.com/' + query,
            },
            
            normalize: function(item) {
                var RELATIONSHIP_TYPE = {
                    SYNONYMS : "syn",
                    SIMILAR  : "sim",                    
                    RELATED  : "rel",
                    ANTONYMS : "ant"
                };
                
                var result = {
                    title: query,
                    subtitle: wordTypeWithMostEntries,                    
                    record_data : {}
                };

                // Display any synonyms if present
                if(item.hasOwnProperty(RELATIONSHIP_TYPE.SYNONYMS)) {                    
                    result.record_data["Synonyms"] = item[RELATIONSHIP_TYPE.SYNONYMS].join(', ');                    
                }
                
                // Display any similar words if present
                if(item.hasOwnProperty(RELATIONSHIP_TYPE.SIMILAR)) {                    
                    result.record_data["Similar"] = item[RELATIONSHIP_TYPE.SIMILAR].join(', ');                    
                }
                
                // Display any related words if present
                if(item.hasOwnProperty(RELATIONSHIP_TYPE.RELATED)) {                    
                    result.record_data["Related"] = item[RELATIONSHIP_TYPE.RELATED].join(', ');                    
                }
                
                // Display any antonyms if present
                if(item.hasOwnProperty(RELATIONSHIP_TYPE.ANTONYMS)) {                    
                    result.record_data["Antonyms"] = item[RELATIONSHIP_TYPE.ANTONYMS].join(', ');                    
                }
             
                return result;
            }
        });
    }
}(this));
