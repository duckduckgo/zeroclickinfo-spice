

/*
 This is the function you define.

To see a live example of what this function produces, check out:
 http://duckduckgo.com/?q=is+it+raining+in+philadelphia

Here is the flow (as laid out in the ../example.html file

1) The external API is called through our servers, e.g.
   http://duckduckgo.com/ir/Phialadelphia

2) The API call returns JSON wrapped in a callback function, i.e. JSONP.

3) That callback function is defined below. It's name corresponds
   to the internal API endpoint, i.e. /ir/ becomes /nrir/.
   Your project will get its own unique endpoint, and thus 
   function name.

4) The callback function receives the JSON object as its argument.
   There is no need to parse the string returned by the API; it is
   already a JavaScript object -- that's the beauty of JSONP.

   You can check out what it looks like by using Firebug or
   a browser extention like JSONView

5) The function should do some validity checks to make sure
   what it got back is appropriate for display.

6) If so, then you create the return object and send it to nra(),
   which displays it on the page.
*/

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
