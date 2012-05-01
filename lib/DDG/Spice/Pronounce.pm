# This plugin pronounces a word

package DDG::Spice::Pronounce;

use DDG::Spice;

spice is_cached => 1;

spice to => 'http://howjsay.com/mp3/$1.mp3';

# This plugin triggers when the query begins with 'say'
triggers start => 'say';

# The plugin sends the rest of the query to 'howjsay'
handle remainder => sub {

    # Can only accept a word
    if ($_ =~ /^([A-Za-z]+)$/) {
        return $1;
    }

    return;
};

1;
