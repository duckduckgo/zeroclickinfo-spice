function ddg_spice_upc(response) {
    console.log(response);

    if (!response.valid) return;

    var answer = response.itemname;

	var items = new Array();
	items[0] = new Array();
    items[0]['a'] = answer;
	items[0]['h'] = response.number + " (Universal Product Code)";
	items[0]['s'] = 'UPC Database';
	items[0]['u'] = 'http://www.upcdatabase.org/code/' + response.number;
	
	nra(items);
}
