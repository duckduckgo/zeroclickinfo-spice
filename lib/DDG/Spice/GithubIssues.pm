package DDG::Spice::GithubIssues;
# ABSTRACT: Search Github for Issues related to the query

use DDG::Spice;
use strict;
use warnings;
use Text::Trim;

spice is_cached => 1;
spice proxy_cache_valid => '200 1d';

spice wrap_jsonp_callback => 0;

spice to => 'https://api.github.com/search/issues?q=$1&callback={{callback}}';

my @languages = share("languages.txt")->slurp;
@languages = sort { length($b) <=> length($a) } @languages;

chomp(@languages);
my $langs = join("|", map(quotemeta, @languages));

triggers startend => 'github issue';

# Handle statement
handle remainder_lc => sub {
    return unless $_;

    my $query = $_;
    $query =~ s/\b($langs)\b//;
    trim($query);

    my $lang;

    if (/\b($langs)\b/) {
        $lang = $1;
        return unless length $_;

        return qq($query language:"$lang");
    } else {
        return $query;
    }
};

1;
