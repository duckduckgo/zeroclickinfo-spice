package DDG::Spice::RandWord;
# ABSTRACT: Shows a random word

use strict;
use DDG::Spice;
use List::Util 'min';

name "Random Word";
description "Generates a random word";
source "WordNik";
primary_example_queries "random word", "5 random words 5-10";
category "random";
topics "words_and_games", "everyday";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/RandWord.pm";
icon_url "/i/wordnik.com.ico";
attribution web => ['http://dylansserver.com','Dylan Lloyd'],
            email => ['dylan@dylansserver.com','Dylan Lloyd'];

spice from => '(?:([0-9]+)\-([0-9]+)\-([0-9]+))';
spice to => 'http://api.wordnik.com/v4/words.json/randomWords?minLength=$1&maxLength=$2&limit=$3&api_key={{ENV{DDG_SPICE_WORDNIK_APIKEY}}}&callback={{callback}}';
spice proxy_cache_valid => "418 1d";

triggers any => "random word", "random words";

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
