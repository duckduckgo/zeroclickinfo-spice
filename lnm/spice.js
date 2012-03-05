function nrlnm(songs) {
  var snippet = '';

  // For debugging.
  console.log(songs);

  // Validity check.
  if (songs.length > 0) {

    // Snippet that gets shown in the 0-click box.
    s = songs[0];
    snippet  = '<p>' + s.artist_name + ' - ' + s.title + ' Lyrics' + '</p>';
    snippet += '<p>' + s.snippet.replace(/(\r\n){2}/g, ' // ').replace(/(\r\n)/g, ' / ').replace(/\s?\.{3}/, '') + '</p>';

    items = new Array();
    items[0] = new Array();
    items[0]['a'] = snippet;

    items[0]['h'] = '';

    // Source name and url for the More at X link.
    items[0]['s'] = 'LYRICSnMUSIC';
    items[0]['u'] = s.url;

	  nra(items);
  }
}
