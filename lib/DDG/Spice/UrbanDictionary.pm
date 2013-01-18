package DDG::Spice::UrbanDictionary;
# ABSTRACT: Give the Urban Dictionary definition of the search query.

use DDG::Spice;

primary_example_queries "urbandictionary ROTFL";
secondary_example_queries "ud OMG", "ud ASD";
description "Lookup UrbanDictionary definitions";
name "UrbanDictionary";
icon_url "/i/urbandictionary.com.ico";
source "UrbanDictionary";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/UrbanDictionary.pm";
topics "geek";
category "language";
attribution github => ['https://github.com/FiloSottile','FiloSottile'],
            web => ['http://pytux.it','Filippo Valsorda'],
            email => ['filippo.valsorda@gmail.com','Filippo Valsorda'];

spice is_unsafe => 1;

triggers startend => "ud", "urban", "urbandictionary", "urban dictionary";

spice to => 'http://api.urbandictionary.com/v0/define?term=$1&callback={{callback}}';

handle remainder => sub {
    my ($term) = @_;
    return $term if $term;
    return;
};

1;