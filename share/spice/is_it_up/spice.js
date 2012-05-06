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
        out = "<a href='http://" + res['domain'] +"'>" + res['domain'] + "</a> seems <b>up</b>. ";
        out += "It took us " + res['response_time'] + " seconds to get a ";

        out += "<a href='/?q=http+" +
	    //                responses[Math.floor(res['response_code'] / 100)] + 
	    res['response_code'] + 
	    "'>" + res['response_code'] + "</a>";

        out += " response from <a href='/?q=" + res['response_ip'] + "'>" + res['response_ip'];
    } else {
        out = "<a href='http://" + res['domain'] +"'>" + res['domain'] + "</a> seems <b>down</b>. We did not get a response from it.";
    } 
	
	items = new Array();
	items[0] = new Array();
	items[0]['a'] = out;
	items[0]['h'] = '';
	items[0]['s'] = 'IsItUp';
	items[0]['u'] = 'http://isitup.org/' + res['domain'];
	nra(items);
}
