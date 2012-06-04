function ddg_spice_big_huge_antonym(antonyms) {
  ddg_spice_big_huge_varinym(antonyms, 'ant', 'Antonyms of ', true, '', '');
}
function ddg_spice_big_huge_related(related) {
  ddg_spice_big_huge_varinym(related, 'rel', 'Related to ', true, '', '');
}
function ddg_spice_big_huge_similar(similar) {
  ddg_spice_big_huge_varinym(similar, 'sim', 'Similar to ', true, '', '');
}
function ddg_spice_big_huge_synonym(synonyms) {
  ddg_spice_big_huge_varinym(synonyms, 'syn', 'Synonyms of ', true, '', '');
}

function ddg_spice_big_huge_varinym(json, mode, heading, complete, modifier, content) {
  if (json) {
    var forms = {};
    var wc = 0;

    forms['noun']      = 'Nouns';
    forms['verb']      = 'Verbs';
    forms['adverb']    = 'Adverbs';
    forms['adjective'] = 'Adjectives';

    for(form in forms) {
      if(json[form] && json[form][mode]) {
        content += get_content(json[form][mode], modifier + forms[form]);
        wc += json[form][mode].length;
      }
    }

    if (mode == 'syn' && wc < 10) {
      content = ddg_spice_big_huge_varinym(json, 'sim', 'Similar to ', false, 'Similar ', content);
      ddg_spice_big_huge_varinym(json, 'rel', 'Synonyms of ', true, 'Related ', content);
      return false;
    }

    if (!complete) {
      return content;
    }

    if (content.length > 0 && complete) {
        build_items(content, heading);
    }
  }
}
function get_content(terms, heading) {
  var wordlist = "<i>" + heading + "</i>: ";

  for(term in terms) {
    wordlist += terms[term] + ", ";
  }

  wordlist = wordlist.substr(0, wordlist.length - 2);
  wordlist += "<br />";

  return wordlist;
}

function build_items(a, h) {
  var word = DDG.get_query().replace(/(synonyms?|antonyms?|similar|related)\s*(terms?|words?)?\s*(to|for)?\s*/, "");

  items = [[]];
  items[0]['a'] = (a);
  items[0]['h'] = (h + word);
  items[0]['s'] = 'Big Huge Thesaurus';
  items[0]['u'] = 'http://words.bighugelabs.com/' + word;

  nra(items);
}
