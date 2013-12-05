function ddg_spice_word_map(api_result) {
    if (!api_result.map) return;
    if (200 != api_result.result_code) return;

    Spice.render({
        data             	: api_result,
        force_big_header 	: true,
        force_space_after	: true,
        force_no_fold 	 	: true        
        header1          	: api_result.entry + " (Semantically related to)",
        source_url       	: 'http://twinword.com',
        source_name      	: 'Twinword',
        template_normal  	: 'word_map',
    });
}
