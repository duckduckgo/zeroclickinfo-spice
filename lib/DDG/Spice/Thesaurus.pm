package DDG::Spice::Thesaurus;
# ABSTRACT: Give the synonym, antonym, similar and related words of the query.

use DDG::Spice;

primary_example_queries "synonyms for person", "thesaurus awesome";
secondary_example_queries "similar words to miniature";
description 'Related words';
name "BigHuge Thesaurus";
source "Big Huge Labs";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Thesaurus.pm";
topics "music", "words_and_games";
category  "language";
attribution github => ['https://github.com/lactose','lactose'],
           twitter => ['http://twitter.com/hackariah','zachariah'];

spice from => '([^/]+)/([^/]+)';
spice to => 'http://words.bighugelabs.com/api/2/{{ENV{DDG_SPICE_BIGHUGE_APIKEY}}}/$1/json?callback={{callback}}';

triggers startend => "synonyms", "synonym", "antonyms", "antonym", "related", "similar", "thesaurus";

handle query_lc => sub {
  /^
      (?:(synonym|antonym|related|similar|thesaurus)s?)\s+
      (?:(?:terms?|words?)\s+)? (?:(?:of|to|for)\s+)?
      (\w+) \s*
      |
      (\w+)\s+
      ((synonym|antonym|thesaurus)s?)?
  $/x;

  my $type = $1 || $4;
  my $word = $2 || $3;

  return unless $word and $type;

  $type = 'synonym' if $type eq 'thesaurus';

  return $word, $type;

  return;
};

1;
