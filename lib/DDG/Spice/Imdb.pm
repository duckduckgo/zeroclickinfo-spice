package DDG::Spice::Imdb;
# ABSTRACT: Give a summary of the movie from its IMDB page.

use DDG::Spice;

triggers startend => "imdb";

spice to => 'http://www.imdbapi.com/?t=$1&callback={{callback}}';

primary_example_queries "IMDb shawshank redemption";
description "Display movie information from IMDB";
name "Imdb";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Imdb.pm";
icon_url "/i/www.imdb.com.ico";
topics "entertainment";
category "entertainment";
attribution github => ['https://github.com/viswanathgs','viswanathgs'];
status "enabled";

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
