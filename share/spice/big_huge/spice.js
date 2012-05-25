function ddg_spice_bighuge_antonym(antonyms) {
  ddg_spice_bighuge_varinym(antonyms, 'ant', 'Antonyms of ');
}
function ddg_spice_bighuge_related(related) {
  ddg_spice_bighuge_varinym(related, 'rel', 'Related to ');
}
function ddg_spice_bighuge_similar(similar) {
  ddg_spice_bighuge_varinym(similar, 'sim', 'Similar to ');
}
function ddg_spice_bighuge_synonym(synonyms) {
  ddg_spice_bighuge_varinym(synonyms, 'syn', 'Synonyms of ');
}

function ddg_spice_bighuge_varinym(json, mode, heading) {
  if (json) {
    var content = '';
    var forms = {};

    forms['noun'] = 'Nouns';
    forms['verb'] = 'Verbs';
    forms['adjective'] = 'Adjectives';

    for(form in forms) {
      if(json[form] && json[form][mode]) {
        content += get_content(json[form][mode], forms[form]);
      }
    }

    if (content.length > 0) {
        build_items(content, heading);
    }
  }
}
function get_content(terms, heading) {
  var content = "<b>" + heading + "</b>: ";

  for(term in terms) {
    content += terms[term] + ", ";
  }

  content = content.substr(0, content.length - 2);
  content += "<br />";

  return content;
}

function build_items(a, h) {
  var word = decodeURI(rq);

  items = [[]];
  items[0]['a'] = (a + '<br />');
  items[0]['h'] = (h + word);
  items[0]['s'] = 'Big Huge Thesaurus';
  items[0]['u'] = 'http://words.bighugelabs.com/' + word;

  nra(items);
}


