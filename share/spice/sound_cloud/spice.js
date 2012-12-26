function ddg_spice_sound_cloud(sc) {
  var snippet,iframe,res;
  
  // validity check
  if (sc.length && sc[0].uri && sc[0].title && sc[0].user && sc[0].user.username && sc[0].permalink_url) {
    // rename for readability
    res = sc[0];

    // snippet shown in 0-click
    snippet = d.createElement('span');

    // create embedded soundcloud player
    iframe = d.createElement('iframe');
    iframe.setAttribute('width', '100%');
    iframe.setAttribute('height', '166');
    iframe.setAttribute('scrolling', 'no');
    iframe.setAttribute('frameborder', 'no');
    iframe.setAttribute('src', 'https://w.soundcloud.com/player/?url=' + encodeURI(res.uri));

    // append iframe to snippet
    snippet.appendChild(iframe);

    items = new Array();
    items[0] = new Array();
    items[0]['a'] = snippet;

    // set the header to the SoundCloud title
    items[0]['h'] = res.title;

    // source name and url for the More at X link.
    items[0]['s'] = 'SoundCloud';
    items[0]['u'] = res.permalink_url;

    // sorce no compression.
    items[0]['f'] = 1;

    // the rendering function is nra.
    nra(items);
  }
}