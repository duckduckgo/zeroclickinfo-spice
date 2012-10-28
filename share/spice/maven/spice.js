function ddg_spice_maven(resp) {
  if (resp['responseHeader']['status'] == 0 && resp['response']['numFound'] > 0) {
    
    content='<table width="100%" cellspacing="2">' +
              '<tr style="font-weight: bold;">' + 
                '<th>groupId</th>' +
                '<th>artifactId</th>' +
                '<th>version</th>' +
              '</tr>'
    for (match in resp['response']['docs']) {
      content += '<tr>' +
                   '<td><a href="http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22' + resp['response']['docs'][match]['g'] + '%22">' + resp['response']['docs'][match]['g'] + '</td>' + 
                   '<td><a href="http://search.maven.org/#search%7Cgav%7C1%7Cg%3A%22' + resp['response']['docs'][match]['g'] + '%22%20AND%20a%3A%22' + resp['response']['docs'][match]['a'] + '%22">' + resp['response']['docs'][match]['a'] + '</td>' + 
                   '<td><a href="http://search.maven.org/#artifactdetails%7C' + resp['response']['docs'][match]['g'] + '%7C' + resp['response']['docs'][match]['a'] + '%7C' + resp['response']['docs'][match]['latestVersion'] + '%7Cjar">' + resp['response']['docs'][match]['latestVersion'] + '</td>' + 
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
