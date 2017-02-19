function nrlnm(songs) {
  var snippet = '',
      heading = '';

  // console.log(songs);

  if (songs.length > 0) {

    s = songs[0];
    heading = s.artist_name + ' - ' + s.title + ' (Lyrics)';
    snippet = s.snippet.replace(/(\r\n){2}/g, ' // ').replace(/(\r\n)/g, ' / ').replace(/\s?\.{3}/, '');

    items = [[]];
    items[0]['h'] = heading;
    items[0]['a'] = snippet;
    items[0]['s'] = 'LYRICSnMUSIC';
    items[0]['u'] = s.url;

	  nra(items);
  }
}
