function ddg_spice_guidebox(res)
{
    var out = '';
    var query = DDG.get_query().replace("watch", "");
        query = query.replace("full episodes", "");
        query = query.replace("full episodes of", "");
        query = query.replace("guidebox", "");


    out += res["SeriesName"];

    items = [[]];
    items[0]['a'] = out;
    items[0]['h'] = res["SeriesName"] + ' (Guidebox)';
    items[0]['force_big_header'] = true;
    items[0]['s'] = 'Guidebox';
    items[0]['u'] = 'http://guidebox.com';
    nra(items);


}
