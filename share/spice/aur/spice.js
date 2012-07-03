function ddg_spice_aur(results) {
    if(results['type'] != 'error') {
        var out = '';
        var res = results['results'][0];

        out += res['Name'] + ' ' + res['Version'] + ': ' + res['Description'] + ' (' + res['License'] + ')';
        if (res['OutOfDate'] != "0") {
            out += ' (Out of date)';
        }

        if(res['URL']) out += ' [<a href="'+res['URL']+'">Official site</a>]';

        items = new Array();
        items[0] = new Array();
        items[0]['a'] = out;
        items[0]['h'] = res['Name'];
        items[0]['s'] = 'Archlinux User Repository';
        items[0]['u'] = 'https://aur.archlinux.org/packages.php?ID=' + res['ID'];
        nra(items);
    }
}
