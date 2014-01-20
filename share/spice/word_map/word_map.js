function ddg_spice_word_map(api_result) {
    if ( "200" !== api_result.result_code ) {
	return;
    }

    Spice.render({
        data             	: api_result,
        force_big_header 	: true,
        header1          	: "Related to " + api_result.entry + " (Levelpump)",
        source_url       	: 'http://levelpump.com/graph-dictionary.php?mailLink=' + api_result.encrypt_entry + '&from=ddg',
        source_name      	: 'Levelpump',
        template_normal  	: 'word_map',
	force_favicon_url       : 'http://icons.duckduckgo.com/ip/www.levelpump.com.ico'
    });
}


