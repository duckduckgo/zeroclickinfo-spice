package DDG::Spice::BigHuge;
# ABSTRACT: Give the synonym, antonym, similar and related words of the query.

use DDG::Spice;

primary_example_queries "synonyms for person", "thesaurus awesome";
secondary_example_queries "similar words to miniature";
description 'Related words';
name "BigHuge Thesaurus";
source "Big Huge Labs";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/BigHuge.pm";
topics "music", "words_and_games";
category  "language";
attribution github => ['https://github.com/lactose','lactose'],
           twitter => ['http://twitter.com/hackariah','zachariah'];

spice from => '([^/]+)/([^/]+)';
spice to => 'http://words.bighugelabs.com/api/2/{{ENV{DDG_SPICE_BIGHUGE_APIKEY}}}/$1/json?callback={{callback}}';

triggers startend => "synonyms", "synonym", "antonyms", "antonym", "related", "similar", "thesaurus";

handle query_lc => sub {
  if (/^(synonyms?|antonyms?|related|similar|thesaurus)\s+(?:terms?|words?)?\s*(?:of|to|for)?\s*([\w\s]+)$/) {
    return $2, $1;
  } elsif (/^([\w\s]+)\s+(synonyms?|antonyms?|related|similar|thesaurus)/){
    return $1, $2;
  }

  return;
};

1;