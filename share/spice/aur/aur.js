function ddg_spice_aur(response) {
    "use strict";

    if (response.type === 'error' || !response.results || response.results.length === 0) {
        return;
    }

    var query = DDG.get_query().replace(/(aur|archlinux package|arch package|arch linux package)/, "");

    Spice.render({
        data             : response.results,
        header1          : response.results[0].Name + " (AUR)",
        source_url       : 'https://aur.archlinux.org/packages/?O=0&K=' + query,
        source_name      : 'ArchLinux User Repository',
        spice_name       : 'aur',
        template_frame   : "list",
        template_options : {
            items: response.results,
            template_item: "aur" // will use this also for a single item
        },
        force_big_header : true
    });
}
