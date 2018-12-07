package DDG::Spice::GoWatchIt;
# ABSTRACT: Stream provides for movies and shows

use strict;
use DDG::Spice;
use Text::Trim;

my @triggers = ('watch', 'stream', 'watch online', 'on demand', 'watch now', 'stream online', 'buy movie', 'rent movie','movie');
my @ignorewords = ('movie', 'show', 'tv', 'online', 'stream');
my @stopwords = ('apple watch', 'pocket watch', 'night watch', 'watch tower', "stop watch");

my $ignorewords = join '|', @ignorewords;

triggers startend => @triggers;

spice to => 'http://gowatchit.com/api/v3/search?term=$1&full_meta=true&api_key={{ENV{DDG_SPICE_GOWATCHIT_APIKEY}}}';
spice wrap_jsonp_callback => 1;

handle remainder_lc => sub {

    return unless $_; # Guard against "no answer"
    return if grep {$req->query_lc eq $_} @stopwords;

    $_ =~ s/\b$ignorewords\b//g; # remove ignorewords
    return trim($_); # trim spaces and return
};

1;
