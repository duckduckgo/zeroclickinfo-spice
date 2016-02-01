package DDG::Spice::Envato;
# ABSTRACT: Envato marketplace search

use strict;
use DDG::Spice;

my @triggers = qw(themeforest codecanyon videohive audiojungle graphicriver 3docean activeden);
triggers any => @triggers;

my $triggers = join '|', @triggers;

spice wrap_jsonp_callback => 1;
spice from => '([^\/]+)/([^\/]+)';
spice to => 'http://marketplace.envato.com/api/edge/search:$1,,$2.json';

handle query_lc => sub {
    my $platform = $1 if $_ =~ /($triggers)/;

    if ($platform){
        # remove trigger name, remove or/and words, remove everything that is not a space or a word character
        s/[^\s\w]|$platform|\s+and|\s+or|or\s+|and\s+//g;

        # trim a query
        s/^\s+|\s+$//g;

        # replace spaces with |
        s/\s+/|/g;

        return $platform, $_;
    }

    return
};

1;
