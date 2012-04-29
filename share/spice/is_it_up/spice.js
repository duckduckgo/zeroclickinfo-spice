function ddg_spice_is_it_up(res) 
{
    var out = '';
    
    var responses = new Array();
    responses[1] = "1xx_Informational";
    responses[2] = "2xx_Success";
    responses[3] = "3xx_Redirection";
    responses[4] = "4xx_Client_Error";
    responses[5] = "5xx_Server_Error";

    if (res['status_code'] === 1) {
        out = "<a href='http://" + res['domain'] +"'>" + res['domain'] + "</a> is up. <br />";
        out += "It took " + res['response_time'] + " seconds to get ";

        out += "<a href='http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#" +
                responses[Math.floor(res['response_code'] / 100)] + 
                "'>" + res['response_code'] + "</a>";

        out += " response form " + res['response_ip'];
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
