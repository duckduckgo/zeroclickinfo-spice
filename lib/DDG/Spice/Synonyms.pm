package DDG::Spice::Synonyms;
# ABSTRACT: Give the synonyms of the query.

use DDG::Spice;

my $api_key = $ENV{"BHUGE_KEY"};
spice to => 'http://words.bighugelabs.com/api/2/${api_key}/$1/json?callback=ddg_spice_synonyms';

triggers startend => "synonyms", "synonym";

handle remainder => sub {
    return $_;
}

1;
