function ddg_spice_expand_url(res)
{
    if (res["long-url"]){

        var query = DDG.get_query().replace(/expand\s*/i, "");

        if (res["long-url"] != query) {

            var out ='Expanded url: <a href="' 
                    + res['long-url'] + '">' 
                    + res['long-url'] + '</a>';

            items = [[]];
            items[0]['a'] = out;
            items[0]['h'] = query + ' (Short URL)';
            items[0]['s'] = 'LongURL';
            items[0]['u'] = 'http://longurl.org/expand?url=' + query;
            nra(items);
        }
    }
}
