

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

function ddg_spice_expatistan(ir) {
    var snippet = '';
    if (ir['status'] == 'OK') {
			snippet = ir['abstract'];
			items = new Array();
			items[0] = new Array();
			items[0]['a'] = snippet;
			items[0]['h'] = '';
			items[0]['s'] = 'Expatistan';
			items[0]['u'] = ir['source_url'];
			nra(items);
    }
}
