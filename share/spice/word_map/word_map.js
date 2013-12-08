function ddg_spice_word_map(api_result) 
{
	var json = null;
	if ( api_result instanceof Object )
	{
		json = api_result;
	}
	else
	{
		json = $.parseJSON(api_result);
	}

	if ( 200 != json.result_code ) return;

    Spice.render
    ({
        data             	: json,
        force_big_header 	: true,
        header1          	: "More words like " + json.entry,
        source_url       	: 'http://levelpump.com/graph-dictionary.php?mailLink=' + json.encrypt_entry + '&from=ddg',
        source_name      	: 'Twinword-Levelpump',
        force_favicon_url	: 'http://files.twinword.com/uploads/7/2/1/6/7216232/tw_favicon.ico',
        template_normal  	: 'word_map'
    });
}
