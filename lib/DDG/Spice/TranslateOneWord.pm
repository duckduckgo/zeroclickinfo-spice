package DDG::Spice::TranslateOneWord;
# ABSTRACT: translate one word to another language

use DDG::Spice;

# Caching - https://duck.co/duckduckhack/spice_advanced_backend#caching-api-responses
spice is_cached => 1;

# Metadata.  See https://duck.co/duckduckhack/metadata for help in filling out this section.
name "TranslateOneWord";
source "Yandex Translate";
icon_url "http://www.yandex.com/favicon.ico";
description "Translate one word to another language";
primary_example_queries "translate hello from en to fr";
category "language";
topics "everyday", "words_and_games";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/TranslateOneWord.pm";
attribution github => ["cinlloc", "Clément Collin"];

# API endpoint - https://duck.co/duckduckhack/spice_attributes#spice-codetocode
spice from => '([a-z]+)[^a-z]*from[^a-z]*([a-z]+)[^a-z]*to[^a-z]*([a-z]+)';
spice to => 'https://translate.yandex.net/api/v1.5/tr.json/translate?key={{ENV{DDG_SPICE_YANDEX_APIKEY}}}&lang=$2-$3&text=$1&callback={{callback}}';

# Triggers - https://duck.co/duckduckhack/spice_triggers
triggers start => "translate";

# Handle statement
handle remainder => sub {

    return unless $_;    # Guard against "no answer"
    
    return $_;
};

1;
