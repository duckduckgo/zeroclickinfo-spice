function ddg_spice_synonyms(synonyms) {
  if(synonyms) {

    if(synonyms.noun.syn.length > 0) {
      var content = "<strong>Nouns</strong>: ";
      for(var i=0;i < synonyms.noun.syn.length; i++) {
        content += synonyms.noun.syn[i] + ", ";
      }
      content = content.substr(0, content.length - 2);
    }

    if(synonyms.verb.syn.length > 0) {
      content += "<br /><strong>Verbs</strong>: ";
      for(var i=0;i< synonyms.verb.syn.length; i++) {
        content += synonyms.verb.syn[i] + ", ";
      }
      content = content.substr(0, content.length -2);
    }

    var heading = "Synonyms";// of " + word;

    /* There was no way to include an extra parameter in the callback
     * function -- so I can't display the search term. BigHugeAPI does
     * not currently return search request. 
     */

    items = [[]];
    items[0]['a'] = content;
    items[0]['h'] = heading;
    items[0]['s'] = 'Big Huge Thesaurus';
    items[0]['u'] = 'http://words.bighugelabs.com/';// + word;

    nra(items);
  }

}

