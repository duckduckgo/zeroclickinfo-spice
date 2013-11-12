package DDG::Spice::RandWord;

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

spice from => '(?:([0-9]+)\-([0-9]+)|)';
spice to => 'http://api.wordnik.com/v4/words.json/randomWord?minLength=$1&maxLength=$2&api_key={{ENV{DDG_SPICE_RANDWORD_APIKEY}}}&callback={{callback}}';
spice proxy_cache_valid => "418 1d";

triggers any => "random word";

handle remainder => sub {
    if ($_ =~ /^([0-9]+\-[0-9]+)$/) {
    	 return $1;
    } else {
        return '0-100';
    }
    return;
};

1;
