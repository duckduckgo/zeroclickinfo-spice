
function ddg_spice_sunlight_campaign_finance(candidate) {
    var snippet = '';

    if (candidate) {
       if (candidate.length > 1) {
    	   snippet = format_list(candidate);
       }
       else {
           snippet = format_snippet(candidate);    	   
       }
       items = new Array();
       items[0] = new Array();
       items[0]['a'] = snippet;
       items[0]['h'] = 'Campaign finance summary';
       items[0]['s'] = 'Sunlight Foundation';
       items[0]['u'] = 'http://influenceexplorer.com/';
       console.log(items);
       nra(items);
    }
}

function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}



function format_list(candidates) {
	var list, div;
	
	list = d.createElement('span');
	div = d.createElement('div');
	div.innerHTML = ''
	for (i=0;i<candidates.length;i++){
		div.innerHTML += '<a href = "http://127.0.0.1:5000/?q=sunlight+' + encodeURI(candidates[i]['name']) + '">' + candidates[i]['name'] + '</a>\t' + candidates[i]['seat'] + '<br>';
	}
	list.appendChild(div);
	return list;
}	



function format_snippet(candidate){
	var snippet, div;
	
	snippet = d.createElement('span');
    div = d.createElement('div');
    div.innerHTML = candidate[0]['name'] + ' has received a total of $' + addCommas(candidate[0]['total_received']) + ' campaigning for the office of ' + candidate[0]['seat'].split(':')[1] + '.';    
    div.innerHTML += '<br>Top industries: <br>' + nrj("http://transparencydata.com/api/1.0/aggregates/pol/f99f7d244bbf4325b31312f75643f8da/contributors/sectors.json?apikey=81ae602f16f34cbc9fe2643c7691f3d3&callback=ddg_spice_sunlight_campaign_finance_industry");
    
    snippet.appendChild(div);

    return snippet;
}

function ddg_spice_sunlight_campaign_finance_industry(response) {
	var industry_list = "";
	for (i=0;i<response.length;i++) {
		industry_list += response[i]['sector'] + ": $" + addCommas(response[i]['amount']) + '<br>';
	};
	console.log("list from _industry: " +industry_list);
	return industry_list;
	
}