package DDG::Spice::Rhymes;

use DDG::Spice;

name "Rhymes";
description "find rhyming words";
source "RhymeBrain";
primary_example_queries "what rhymes with duck";
secondary_example_queries "go rhymes with", "words that rhyme with smile";
category "language";
topics "everyday", "music", "words_and_games";
attribution web => ['http://dylansserver.com','Dylan Lloyd'],
            email => ['dylan@dylansserver.com','Dylan Lloyd'];
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Rhymes.pm";
icon_url "/i/rhymebrain.com.ico";
status "enabled";

triggers any => "rhyme", "rhymes";

spice to => 'http://rhymebrain.com/talk?function=getRhymes&word=$1&jsonp={{callback}}';

handle query_lc => sub {
    return $1 if /^(?:(?:what|words?)\s+)?(?:that\s+)?(?:rhymes?(?:\s+?(?:with|for))?\s*)?([a-zA-Z]+)(?:\s+rhymes?)?(?:\s+with)?\??$/;
    return;
};

1;
