function ddg_spice_meta_cpan(response) {
	if (response["message"]) return;
    
    var pkg = {};

	pkg.query       = DDG.get_query().replace(/\s*(metacpan|meta cpan|cpan)\s*/i, '');
	pkg.name        = response.documentation ? response.documentation : "No documentation specified.";
	pkg.author      = response.author ? response.author : "No author specified.";
	pkg.abstract    = response.abstract ? response.abstract : "No abstract specified.";
	pkg.version     = response.version ? response.version : "No version given.";
	pkg.description = response.description ? response.description : "No description specified.";

    if (pkg.description.length > 340)
        pkg.description = pkg.description.substring(0, 340)
                        + '...';

    Spice.render({
        data             : pkg,
        header1          : pkg.query + " (MetaCPAN)",
        source_url       : 'https://metacpan.org/search?q='
                           + encodeURIComponent(name),
        source_name      : 'MetaCPAN',
        template_normal  : 'metacpan',
        force_big_header : true,
        force_no_fold    : true,
    });
}
