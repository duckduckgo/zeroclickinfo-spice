package DDG::Spice::MetaCPAN;
# ABSTRACT: Show a summary of the searched CPAN module.

use DDG::Spice;

primary_example_queries "metacpan WWW::DuckDuckGo";
description "Searches CPAN modules";
name "MetaCPAN";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/MetaCPAN.pm";
icon_url "/i/metacpan.org.ico";
topics "programming", "sysadmin";
category "programming";
attribution github  => ['https://github.com/ghedo', 'ghedo'],
            web => ['http://ghedini.me', 'Alessandro Ghedini'];

spice to   => 'http://api.metacpan.org/v0/module/$1?callback={{callback}}';

triggers startend => "cpan", "cpanm", "metacpan", "meta cpan";

handle remainder => sub {
    return $_ if $_;
    return;
};
1;
