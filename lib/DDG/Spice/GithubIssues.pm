package DDG::Spice::GithubIssues;
# ABSTRACT: Search Github for Issues related to the query

use DDG::Spice;
use strict;
use warnings;
use Text::Trim;
use Data::Dumper;

spice is_cached => 1;
spice proxy_cache_valid => '200 1h';

spice wrap_jsonp_callback => 0;

spice to => 'https://api.github.com/search/issues?q=$1&callback={{callback}}';

my @languages = share("languages.txt")->slurp( chomp => 1);
@languages = sort { length($b) <=> length($a) } @languages;

my $langs = join("|", map(quotemeta, @languages));

triggers end => 'github issue';

# Handle statement
handle remainder_lc => sub {
    return unless $_;

    if (m/\b($langs)$/) {
        my $lang = $1;
        s/\b($langs)$//;
        trim($_);
        return unless length $_;
        return qq($_ language:"$lang");
    }

    return $_;
};

1;
