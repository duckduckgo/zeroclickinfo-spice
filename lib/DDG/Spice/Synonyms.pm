package DDG::Spice::Synonyms;
# ABSTRACT: Give the synonyms of the query.

use DDG::Spice;

my $api_key = $ENV{"BHUGE_KEY"};
spice to => 'http://words.bighugelabs.com/api/2/${api_key}/$1/json?callback=ddg_spice_synonyms';

triggers startend => "synonyms";

handle query_lc => sub {
  if ($_ =~ /^synonyms (\w+)$/) {
    my $res = $1 || '';
    return $res if $res;
  }
};

1;
