package DDG::Spice::RandWord;
# ABSTRACT: Shows a random word

use strict;
use DDG::Spice;
use List::Util 'min';

spice from => '(?:([0-9]+)\-([0-9]+)\-([0-9]+))';
spice to => 'http://api.wordnik.com/v4/words.json/randomWords?minLength=$1&maxLength=$2&limit=$3&api_key={{ENV{DDG_SPICE_WORDNIK_APIKEY}}}&callback={{callback}}';
spice proxy_cache_valid => "418 1d";
spice content_type_javascript => 1;

triggers any => "random word", "random words";

spice alt_to => {
    rand_word_fetch_id => {
        to => 'http://api.wordnik.com:80/v4/word.json/$1/definitions?limit=1&includeRelated=false&sourceDictionaries=all&useCanonical=false&includeTags=false&api_key={{ENV{DDG_SPICE_WORDNIK_APIKEY}}}',
	}
};

handle query_lc => sub {
    my $minlen = 1;
    my $maxlen = 100;
    my $limit = 10;
    my $maxLimit = 500;

    if ($_ =~ m/(?<limit>\d+)? ?random word(s)? ?((?<min>\d+)\-(?<max>\d+))?$/) {
        if (!$1 && !$2) {
            # 'random word'
            $limit = 1;
        } elsif ($1) {
            # '15 random words'
            $limit = min($1, $maxLimit);
        }

        $minlen = $+{min} if $+{min};
        $maxlen = $+{max} if $+{max};

        if ($minlen > $maxlen) {
            ($minlen, $maxlen) = ($maxlen, $minlen)
        }

        return join('-', $minlen, $maxlen, $limit);
    }

    return;
};

1;
