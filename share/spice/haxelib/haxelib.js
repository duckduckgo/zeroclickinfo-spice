function ddg_spice_haxelib(response) {
    "use strict";
    if(response.err) return;
    var query = DDG.get_query().replace(/(haxelib|haxe lib|haxe library)/, "");
    Spice.render({
        data             : response.info,
        header1          : response.info.name + " (Haxelib) by " + response.info.owner,
        source_url       : 'http://lib.haxe.org/p/' + encodeURIComponent(response.info.name),
        source_name      : 'Haxelib',
        spice_name       : 'haxelib',
        force_no_fold    : true,
        force_big_header : true
    });
}
