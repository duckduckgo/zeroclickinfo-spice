function ddg_spice_meta_cpan(api_response) {
	if (api_response["message"]) return;
    
	query = DDG.get_query().replace(/\s*(metacpan|meta cpan|cpan)\s*/i, '');

    Spice.render({
        data             : api_response,
        header1          : query + " (MetaCPAN)",
        source_url       : 'https://metacpan.org/search?q='
                           + encodeURIComponent(name),
        source_name      : 'MetaCPAN',
        template_normal  : 'meta_cpan',
        force_big_header : true,
        force_no_fold    : true,
    });
}
