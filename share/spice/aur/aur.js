function ddg_spice_aur(response) {
    if (response.type == 'error'
            || !response.results
            || response.results.length == 0)
        return;

    var pkgs = response.results;
    var pkg  = pkgs[0];

    Spice.render({
        data             : pkgs.length == 1 ? pkg : { 'package' : pkgs },
        header1          : pkg['Name'] + " (AUR)",
        source_url       : 'https://aur.archlinux.org/packages.php?ID=' + response['ID'],
        source_name      : 'ArchLinux User Repository',
        template_normal  : pkgs.length == 1 ? 'single' : 'list',
        force_big_header : true
    });
}
