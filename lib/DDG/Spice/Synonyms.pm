package DDG::Spice::Synonyms;
# ABSTRACT: Give the synonyms of the query.

use DDG::Spice;

spice from => '([^/]+)/?(?:([^/]+)/?(?:([^/]+)|)|)';
spice to => 'http://words.bighugelabs.com/api/2/{{ENV{BHUGE_KEY}}}/$1/json?callback=ddg_spice_$2';

triggers startend => "synonyms", "synonym", "antonyms", "antonym", "related", "similar";

handle query_lc => sub {
  if (/^(synonyms|antonyms|synonym|antonym|related|similar)\s*(\w+)/) {
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
