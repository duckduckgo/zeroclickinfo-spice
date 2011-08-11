/*
  nr is the prefix for this function space.
*/
function nrxk(xk) {
  // console.log(xk);

  // validity check
    if (xk['img'] && xk['alt']) {
    // snippet shown in 0-click
	snippet = '<img src="' + xk['img'] + '" title="' + xk['alt'] + '" />';
	items = new Array();
	items[0] = new Array();
	items[0]['a'] = snippet;

	items[0]['h'] = xk['title'];

    // Source name and url for the More at X link.
	items[0]['s'] = 'XKCD';
	items[0]['u'] = 'http://xkcd.com/' + xk['num'] + '/';

	// Force no compression.
	items[0]['f'] = 1;

	// The rendering function is nra.
	nra(items);
    }
}