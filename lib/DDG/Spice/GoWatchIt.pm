package DDG::Spice::GoWatchIt;

use DDG::Spice;
use Text::Trim;

primary_example_queries "watch boyhood";
secondary_example_queries "incredible hulk on demand";
name "GoWatchIt Search";
source "GoWatchIt.com";
description "Find out where to watch your favorite movies and shows!";
category "entertainment";
topics "entertainment";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/GoWatchIt.pm";
attribution github  => ['https://github.com/plexusent', 'GoWatchIt.com'],
            web     => ['http://gowatchit.com'],
            twitter => ['gowatchit', 'GoWatchIt.com'];

my @triggers = ('watch', 'stream', 'watch online', 'on demand', 'watch now', 'stream online', 'buy movie', 'rent movie');
my @killwords = ('movie', 'show', 'tv', 'online', 'stream');

my $killwords = join '|', @killwords;

triggers startend => @triggers;

spice to => 'http://gowatchit.com/api/v3/search?term=$1&full_meta=true&api_key={{ENV{DDG_SPICE_GOWATCHIT_APIKEY}}}';
spice wrap_jsonp_callback => 1;

handle remainder_lc => sub {

  return unless $_; # Guard against "no answer"
  $_ =~ s/$killwords//g; # remove killwords
  return trim($_); # trim spaces and return

};

1;