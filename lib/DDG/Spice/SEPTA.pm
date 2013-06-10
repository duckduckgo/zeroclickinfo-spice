package DDG::Spice::SEPTA;

use DDG::Spice;

primary_example_queries "next train from Villanova to Paoli";
description "Lookup the next SEPTA train going your way";
name "SEPTA";
source "SEPTA";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/SEPTA.pm";
topics "everyday";
category "time_sensitive";
attribution web => [ 'https://www.duckduckgo.com', 'DuckDuckGo' ],
            github => [ 'https://github.com/duckduckgo', 'duckduckgo'],
            twitter => ['http://twitter.com/duckduckgo', 'duckduckgo'];

spice to => 'http://www3.septa.org/hackathon/NextToArrive/$1/$2/5/';

spice wrap_jsonp_callback => 1;

triggers any => "next train", "train times", "train schedule", "septa";

spice from => '(.*)/(.*)';

handle query_lc => sub {
    s/\s+septa|septa\s+//;
    /(?:next trains?|train times|train schedule)?(?: from| to)? (.+) (to|from) (.+)/;
    my $curr = join " ", map { ucfirst } split /\s+/, $1;
    my $dest = join " ", map { ucfirst } split /\s+/, $3;
    return ($2 eq 'to' ? ($curr, $dest) : ($dest, $curr));
};

1;
