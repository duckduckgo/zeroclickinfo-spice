package DDG::Spice::GoWatchIt;

use DDG::Spice;

name "GoWatchIt Search";
source "GoWatchIt.com";
description "Find out where to watch your favorite movies and shows!";
category "entertainment";
topics "entertainment";
code_url "https://github.com/plexusent/zeroclickinfo-spice/blob/gwi/lib/DDG/Spice/GoWatchIt.pm";
attribution github  => ['https://github.com/plexusent', 'GoWatchIt.com'],
            web     => ['http://gowatchit.com'],
            twitter => ['gowatchit', 'GoWatchIt.com'];

triggers startend => 'watch', 'stream', 'watch online', 'on demand', 'watch now', 'stream online', 'buy movie', 'rent movie';

spice to => 'http://gowatchit.com/api/v3/search?term=$1&full_meta=true';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return $_ if $_;
    return;
};

1;