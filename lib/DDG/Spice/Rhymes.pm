package DDG::Spice::Rhymes;

use DDG::Spice;

attribution web => ['http://dylansserver.com','Dylan Lloyd'],
            email => ['dylan@dylansserver.com','Dylan Lloyd'];

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
