function nra(items) {
  document.getElementById('a').innerHTML = items[0]['a'];
}

// This is the function you mess with.
// To see this live check out http://duckduckgo.com/?q=is+it+raining+in+philadelphia
function nrir(ir) {
    var snippet = '';

    // For debugging.
//    console.log(ir);

    // Validity check.
    if (ir['answer']) {

        // Snippet that gets shown in the 0-click box.
	snippet = '<b>' + ir['answer'] + '</b>';
	if (ir['forecast']) snippet += '; ' + ir['forecast'];
	if (ir['location']) snippet += ' (' + ir['location'] + ')';

	items = new Array();
	items[0] = new Array();
	items[0]['a'] = snippet;

	items[0]['h'] = '';

        // Source name and url for the More at X link.
	items[0]['s'] = 'GoingToRain';
	items[0]['u'] = 'http://goingtorain.com/';

	nra(items);
    }
}
