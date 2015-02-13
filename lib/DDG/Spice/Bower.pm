package DDG::Spice::Bower;
# ABSTRACT: Returns a package list from Bower package registry.

use DDG::Spice;

name "Bower";
category "programming";
topics "sysadmin", "programming";
primary_example_queries "bower underscore";
description "Shows a list of Bower packages.";
attribution github  => ['https://github.com/francisbrito', 'francisbrito'],
            twitter => ['https://twitter.com/frxbr', 'frxbr'];
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Bower.pm";


triggers startend => 'bower';

spice to => 'http://bower.herokuapp.com/packages/search/$1';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
