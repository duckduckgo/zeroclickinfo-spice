function ddg_spice_aur(response) {
    "use strict";

    if (response.type === 'error' || !response.results || response.results.length === 0) {
        return;
    }

    var pkgs = response.results;
    var pkg  = pkgs[0];

    var query = DDG.get_query().replace(/(aur|archlinux package|arch package|arch linux package)/, "");

    Spice.render({
        data             : pkgs.length === 1 ? pkg : {'package' : pkgs},
        header1          : pkg.Name + " (AUR)",
        source_url       : 'https://aur.archlinux.org/packages/?O=0&K=' + query,
        source_name      : 'ArchLinux User Repository',
        template_normal  : pkgs.length === 1 ? 'single' : 'list',
        force_big_header : true
    });
}
