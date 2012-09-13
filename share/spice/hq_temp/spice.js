function ddg_spice_hq_temp(temp) {

    var snippet = '';
    if (temp) {

	snippet += 'The temperature is currently '+temp.temp.replace(/^0*/,'')+' Degrees '+temp.unit+' at '+temp.location;

	items = new Array();
	items[0] = new Array();
	items[0]['a'] = snippet;
       
	items[0]['h'] = 'Temperature at '+temp.location;

	// Source name and url for the More at X link.
	items[0]['s'] = 'Roberts Nifty Temperature Reader';
	items[0]['u'] = 'http://ddg.gg';
       
	nra(items);
    }

}