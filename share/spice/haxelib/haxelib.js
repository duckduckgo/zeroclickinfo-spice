function ddg_spice_haxelib(response) {
    "use strict";
    if(response.err) return; // indicates an API error
    Spice.add({
        data             : response.info,
        header1          : response.info.name + " ("+response.info.curversion+") by " + response.info.owner,
        sourceUrl       : 'http://lib.haxe.org/p/' + encodeURIComponent(response.info.name),
        sourceName      : 'Haxelib',
        id       : 'haxelib',
        
        
        force_favicon_url: "http://haxe.org/img/haxe2/favicon.ico" // the Haxe icon
    });
}