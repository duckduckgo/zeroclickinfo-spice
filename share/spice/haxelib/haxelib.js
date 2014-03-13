function ddg_spice_haxelib(response) {
    "use strict";
    if(response.err) {
      return; // indicates an API error
    }
    Spice.render({
        data             : response.info,
        header1          : response.info.name + " ("+response.info.curversion+") by " + response.info.owner,
        source_url       : 'http://lib.haxe.org/p/' + encodeURIComponent(response.info.name),
        source_name      : 'Haxelib',
        spice_name       : 'haxelib',
        force_no_fold    : true,
        force_big_header : true,
        force_favicon_url: "http://haxe.org/img/haxe2/favicon.ico" // the Haxe icon
    });
}
