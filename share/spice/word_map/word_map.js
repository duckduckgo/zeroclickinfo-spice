function ddg_spice_word_map(api_result) {
    if ( "200" !== api_result.result_code ) {
	return;
    }

    Spice.add({
        data             	: api_result,
        
        header1          	: "Related to " + api_result.entry + " (Levelpump)",
        sourceUrl       	: 'http://levelpump.com/graph-dictionary.php?mailLink=' + encodeURIComponent(api_result.encrypt_entry) + '&from=ddg',
        sourceName      	: 'Levelpump',
        templates: {
            item: Spice.word_map.word_map,
            detail: Spice.word_map.word_map
        },
	force_favicon_url       : 'http://icons.duckduckgo.com/ip/www.levelpump.com.ico'
    });
}


