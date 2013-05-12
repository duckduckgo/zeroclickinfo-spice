function ddg_spice_meta_cpan(api_response) {
	if (api_response["message"]) return;
    
    var pkg = {};

	pkg.query       = DDG.get_query().replace(/\s*(metacpan|meta cpan|cpan)\s*/i, '');
	pkg.name        = api_response.documentation ? api_response.documentation : "No documentation specified.";
	pkg.author      = api_response.author ? api_response.author : "No author specified.";
	pkg.abstract    = api_response.abstract ? api_response.abstract : "No abstract specified.";
	pkg.version     = api_response.version ? api_response.version : "No version given.";
	pkg.description = api_response.description ? api_response.description : "No description specified.";

    if (pkg.description.length > 340)
        pkg.description = pkg.description.substring(0, 340)
                        + '...';

    Spice.render({
        data             : pkg,
        header1          : pkg.query + " (MetaCPAN)",
        source_url       : 'https://metacpan.org/search?q='
                           + encodeURIComponent(name),
        source_name      : 'MetaCPAN',
        template_normal  : 'meta_cpan',
        force_big_header : true,
        force_no_fold    : true,
    });
}
