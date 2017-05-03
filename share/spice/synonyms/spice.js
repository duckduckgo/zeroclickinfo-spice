function ddg_spice_antonym(antonyms) {
  ddg_spice_varinym(antonyms, 'ant', 'Antonyms');
}
function ddg_spice_related(related) {
  ddg_spice_varinym(related, 'rel', 'Related');
}
function ddg_spice_similar(similar) {
  ddg_spice_varinym(similar, 'sim', 'Similar');
}
function ddg_spice_synonym(synonyms) {
  ddg_spice_varinym(synonyms, 'syn', 'Synonyms');
}

function ddg_spice_varinym(json, mode, heading) {
  mode = encodeURI(mode);
  var code = "if(json) {var content='';if(json.noun) { if(json.noun." + mode + "){ " + "content+=get_content(json.noun." + mode + ", 'Nouns');}}if(json.verb){ if(json.verb." + mode + "){ " + "content+=get_content(json.verb." + mode + ", 'Verbs');}}if(json.adjective) { if(json.adjective." + mode + " ){ " + "content+=get_content(json.adjective." + mode + ", 'Adjectives');}}if(content.length > 0){build_items(content, heading);}}";
  eval(code);
}
function get_content(json, heading) {
  var content = "<b>" + heading + "</b>: ";
  for(var i=0;i<json.length;i++) {
    content += json[i] + ", ";
  }
  content = content.substr(0, content.length - 2);
  content += "<br />";
  return content;
}

function build_items(a, h) {
  items = [[]];
  items[0]['a'] = (a + '<br />');
  items[0]['h'] = h;
  items[0]['s'] = 'Big Huge Thesaurus';
  items[0]['u'] = 'http://words.bighugelabs.com/';

  nra(items);
}


