function truncate(str) {
  if (str.length > 30) return str.substring(0,27) + '...'
  return str
}

function ddg_spice_maven(resp) {
  if (resp['responseHeader']['status'] == 0 && resp['response']['numFound'] > 0) {

    content='<table id="maven">' +
              '<tr>' + 
                '<th>groupId</th>' +
                '<th>artifactId</th>' +
                '<th>version</th>' +
              '</tr>'
    for (match in resp['response']['docs']) {
      content += '<tr>' +
                   '<td><a href="http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22' + resp['response']['docs'][match]['g'] + '%22">' + truncate(resp['response']['docs'][match]['g']) + '</a></td>' + 
                   '<td><a href="http://search.maven.org/#search%7Cgav%7C1%7Cg%3A%22' + resp['response']['docs'][match]['g'] + '%22%20AND%20a%3A%22' + resp['response']['docs'][match]['a'] + '%22">' + truncate(resp['response']['docs'][match]['a']) + '</a></td>' + 
                   '<td><a href="http://search.maven.org/#artifactdetails%7C' + resp['response']['docs'][match]['g'] + '%7C' + resp['response']['docs'][match]['a'] + '%7C' + resp['response']['docs'][match]['latestVersion'] + '%7Cjar">' + truncate(resp['response']['docs'][match]['latestVersion']) + '</a></td>' + 
                 '</tr>'
    }
    content+='</table>'

    items = new Array();
    items[0] = new Array();
    items[0]['a'] = content;
    items[0]['h'] = 'Maven Central Repository';
    items[0]['s'] = 'Maven Central Repository';
    items[0]['u'] = 'http://search.maven.org/#search%7Cga%7C1%7C' + resp['responseHeader']['params']['q'];
    items[0]["force_big_header"] = true;
    items[0]["force_space_after"] = true;
    nra(items);
  }
}
