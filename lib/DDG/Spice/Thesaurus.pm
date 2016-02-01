package DDG::Spice::Thesaurus;
# ABSTRACT: Give the synonym, antonym, similar and related words of the query.

use strict;
use DDG::Spice;

spice from => '([^/]+)/([^/]+)';
spice to => 'http://words.bighugelabs.com/api/2/{{ENV{DDG_SPICE_BIGHUGE_APIKEY}}}/$1/json?callback={{callback}}';

triggers startend => "synonyms", "synonym", "antonyms", "antonym", "related", "similar", "thesaurus";

handle query_lc => sub {
  /^
      (?:(synonym|antonym|related|similar|thesaurus)s?) \s+
      (?:(?:terms?|words?)\s+)? (?:(?:of|to|for)\s+)?
      (\w+) \s*
      |
      (\w+) \s+
      ((synonym|antonym|thesaurus)s?)? \s*
  $/x;

  my $type = $1 || $4;
  my $word = $2 || $3;

  return unless $word and $type;

  $type = 'synonym' if $type eq 'thesaurus';

  return $word, $type;

  return;
};

1;
