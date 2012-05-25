package DDG::Spice::BigHuge;
# ABSTRACT: Give the synonym, antonym, similar and related words of the query.

use DDG::Spice;

spice from => '([^/]+)/?(?:([^/]+)/?(?:([^/]+)|)|)';
spice to => 'http://words.bighugelabs.com/api/2/{{ENV{DDG_SPICE_BIGHUGE_APIKEY}}}/$1/json?callback=ddg_spice_bighuge_$2';

triggers startend => "synonyms", "synonym", "antonyms", "antonym", "related", "similar";

handle query_lc => sub {
  if (/^(synonyms|antonyms|synonym|antonym|related|similar)\s*(?:terms?|words?)?\s*(?:to|for)?\s*(\w+)$/) {
    my ($callback) = ($1);
    use feature 'switch';
    given($1) {
      when('synonyms') { $callback = 'synonym'; }
      when('antonyms') { $callback = 'antonym'; }
      default { $callback; }
    }
    return $2, $callback;
  }
  return;
};

1;
