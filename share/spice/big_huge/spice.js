function ddg_spice_big_huge_antonym(antonyms) {
  ddg_spice_big_huge_varinym(antonyms, 'ant', 'Antonyms of ');
}

function ddg_spice_big_huge_related(related) {
  if(ddg_spice_bighuge_varinym(related, 'rel', 'Related to ')){
    ddg_spice_bighuge_varinym(related, 'rel', 'Related to ');
  }else{
    ddg_spice_bighuge_varinym(related, 'syn', 'Synonyms for ');
  }
}

function ddg_spice_big_huge_similar(similar) {
  if(ddg_spice_bighuge_varinym(similar, 'sim', 'Similar to ')){
    ddg_spice_bighuge_varinym(similar, 'sim', 'Similar to ');
  }else{
    ddg_spice_bighuge_varinym(similar, 'syn', 'Synonyms for ');
  }
}

function ddg_spice_big_huge_synonym(synonyms) {
  ddg_spice_big_huge_varinym(synonyms, 'syn', 'Synonyms of ');
}

function ddg_spice_big_huge_varinym(json, mode, heading) {
  if (json) {
    var content = '';
    var forms = {};
    
    forms['noun']      = 'Nouns';
    forms['verb']      = 'Verbs';
    forms['adverb']    = 'Adverbs';
    forms['adjective'] = 'Adjectives';

    for(form in forms) {
      if(json[form] && json[form][mode]) {
        content += get_content(json[form][mode], forms[form]);
      }
    }

    if (content.length > 0) {
      build_items(content, heading);
      return true;
    }
  }
  return false;
}

function get_content(terms, heading) {
  var content = "<i>" + heading + "</i>: ";

  for(term in terms) {
    content += terms[term] + ", ";
  }

  content = content.substr(0, content.length - 2);
  content += "<br />";

  return content;
}

function build_items(a, h) {
  var word = decodeURIComponent(rq);//CHANGE THIS TO DDG.get_query;
  var word = word.replace(/(synonyms?|antonyms?|similar|related)\s*(terms?|words?)?\s*(to|for)?\s*/, "");

  items = [[]];
  items[0]['a'] = (a + '<br />');
  items[0]['h'] = (h + word);
  items[0]['s'] = 'Big Huge Thesaurus';
  items[0]['u'] = 'http://words.bighugelabs.com/' + word;

  nra(items);
}
