function ddg_spice_lastfm_events(lastfm) {
   console.log(lastfm);
   if(lastfm.events.event) {
      var shows = '<div style="top"><ul>',length=5;
      for(var i = 0;i < length;i++) {
         shows += '<li><a href="/?q=' + encodeURIComponent(lastfm.events.event[i].title) + '">' +
            lastfm.events.event[i].title + '</a>';
         shows += ' at <a href="/?q=' + encodeURIComponent(lastfm.events.event[i].venue.name) + '">' +
            lastfm.events.event[i].venue.name + '</a>';
         var date = lastfm.events.event[i].startDate;
         date = date.substr(0,date.lastIndexOf(" "));
         shows += ' - ' + date;
      }
      shows += '</ul></div>';
      var items = new Array();
      items[0] = new Array();
      items[0]['a'] = shows;
      items[0]['h'] = 'Concerts Near Me';
      items[0]['s'] = 'Last.fm';
      items[0]['u'] = 'http://www.last.fm/events';
      items[0]['force_no_fold'] = 1;
      items[0]['force_big_header'] = true;
      items[0]['force_space_after'] = true;
      items[0]['f'] = true;
      nra(items,1,1);
   }
}
