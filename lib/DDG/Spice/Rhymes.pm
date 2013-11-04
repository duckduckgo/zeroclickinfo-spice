package DDG::Spice::Rhymes;

use DDG::Spice;

name "Rhymes";
description "find rhyming words";
source "RhymeBrain";
primary_example_queries "what rhymes with duck";
secondary_example_queries "go rhymes with", "words that rhyme with smile";
category "language";
topics "everyday", "music", "words_and_games";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Rhymes.pm";
icon_url "/i/rhymebrain.com.ico";
attribution web => ['http://dylansserver.com','Dylan Lloyd'],
            email => ['dylan@dylansserver.com','Dylan Lloyd'];

triggers any => "rhyme", "rhymes";

spice to => 'http://rhymebrain.com/talk?function=getRhymes&word=$1&jsonp={{callback}}';

spice proxy_cache_valid => "418 1d";

handle remainder_lc => sub {
    /^
    (?:(?:what|words|that?)\s+){0,2}
    (?:(?:with|for)\s+)?
    ([a-zA-Z]+)
    (?:\s+with)?\??
    $/x;
    return $1 if defined $1;
    return;
};

1;
