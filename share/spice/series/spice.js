function ddg_spice_series(res) {

    var show = res[0];
    if(show)
    {
        items = new Array();
        items[0] = new Array();
        items[0]['a'] = "<b>" +  show.name + ": </b>" + "<i>" + show.description + "</i>";
        items[0]['h'] = 'Television Show';

        // Source name and url for the More at X link.
        items[0]['s'] = 'TheTVDB.com';
        items[0]['u'] = 'http://thetvdb.com/?tab=series&id=' + show.id;
        nra(items);
    }
}