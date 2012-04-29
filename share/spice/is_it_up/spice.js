function ddg_spice_is_it_up(res) 
{
    var out = '';
    if (res['status_code'] === 1) {
        out = "<a href='http://" + res['domain'] +"'>" + res['domain'] + "</a> is up. <br />";
        out += "It took " + res['response_time'] + " seconds to get " + res['response_code'] + " response form " + res['response_ip'];
    } else {
        out = "<a href='http://" + res['domain'] +"'>" + res['domain'] + "</a> seems to be down.";
    } 
	
	items = new Array();
	items[0] = new Array();
	items[0]['a'] = out;
	items[0]['h'] = '';
	items[0]['s'] = 'IsItUp';
	items[0]['u'] = 'http://isitup.org/' + res['domain'];
	nra(items,1,1);
}
