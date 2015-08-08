package DDG::Spice::RandWord;
# ABSTRACT: Shows a random word

use strict;
use DDG::Spice;

name "Random Word";
description "Generates a random word";
source "WordNik";
primary_example_queries "random word", "random word 5-10";
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

handle remainder => sub {
    my $minlen = 1;
    my $maxlen = 100;
    my $limit = 1;

    if ($_ =~ /^([0-9]+)\-([0-9]+)$/) {
        # Quesries like "random word 5-10"
        $minlen = $1;
        $maxlen = $2;
    } elsif ($_ =~ /^\d+$/) {
        # Queries like "5 random words"
        $limit = $_;
    } elsif ($_ ne '') {
        # Queries like "random word blah blah"
        return;
    }
    return join('-', $minlen, $maxlen, $limit);
};

1;
