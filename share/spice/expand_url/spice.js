function ddg_spice_expand_url(res)
{
    var out = '';
    
    var query = DDG.get_query().replace(/(expand?)*/, "");

    if (res["long-url"])    
        out += '<b>Long url is: </b> <a href="' + res['long-url'] + '">' + res['long-url'] + '</a><br>';
    else
        out += res['messages'][0]['message'];        

    items = new Array();
    items[0] = new Array();

    items[0]['a'] = out;
    items[0]['s'] = 'LongURL';
    items[0]['u'] = 'http://longurl.org/expand?url=' + query;
    nra(items);
}
