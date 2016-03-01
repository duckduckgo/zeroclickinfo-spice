package DDG::Spice::Kwixer;
# ABSTRACT: Movie search

use strict;
use DDG::Spice;

spice to => 'https://www.kwixer.com/api/search?filter=movie&take=40&source=ddg&lang=en&query=$1';
spice wrap_jsonp_callback => 1;

my @base_words = map { ("$_", "new $_", "newest $_") } ("movie", "movies", "film", "films");
my @triggers = map { ("$_", "$_ with", "$_ featuring", "$_ starring", "$_ by", "$_ directed by", "$_ director") } @base_words;

triggers start => @triggers;
triggers end => @base_words;

handle query => sub {
    return $_ if $_;
    return;
};

1;


