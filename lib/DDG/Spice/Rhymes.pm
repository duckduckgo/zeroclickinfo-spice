package DDG::Spice::Rhymes;

use DDG::Spice;

name "Rhymes";
description "find rhyming words";
source "RhymeBrain";
primary_example_queries "what rhymes with duck", "rhyme list";
secondary_example_queries "go rhymes with";
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
    if ($_ =~ /^(?:what )?(?:rhymes?(?: ?(?:with|for))? ?)?([a-zA-Z]+)(?: rhymes?)?(?: with)?\??$/) {
        if ($1) {
            return $1;
        } else {
            return '';
        }
    }
    return;
};

1;
