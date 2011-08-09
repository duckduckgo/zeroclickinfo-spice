/*
  assuming the function will named xkcd for now
*/
function xkcd(xk) {
  // console.log(xk);

  // validity check
  if (xk['img'] && xk['alt']) {
    // snippet shown in 0-click
    snippet = '<img src="' + xk['img'] + '" title="' + xk['alt'] + '" />';
    items = new Array();
    items[0] = new Array();
    items[0]['a'] = snippet;

    items[0]['h'] = '';

    // Source name and url for the More at X link.
    items[0]['s'] = 'XKCD';
    items[0]['u'] = 'http://xkcd.com/';
    nxkcd(items);
  }
}
