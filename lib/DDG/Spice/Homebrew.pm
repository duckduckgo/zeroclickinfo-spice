package DDG::Spice::Homebrew;
# ABSTRACT: Returns formula information from Homebrew formulas index (http://brewformulas.org).

use strict;
use DDG::Spice;

primary_example_queries "brew wget", "brew install wget";
secondary_example_queries "homebrew wget", "wget homebrew", "wget brew";
description "Homebrew formulas information";
name "Homebrew";
code_url "https://github.com/Retrobottega/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Homebrew.pm";
icon_url "/i/brewformulas.org.ico";
topics "computing", "geek", "sysadmin";
category "software";

attribution email   => ['contact@sgentile.it', 'Salvatore Gentile'],
            github  => ['https://github.com/SalGnt', 'SalGnt'],
            twitter => '_sgentile',
            web     => ['http://sgentile.it', 'Salvatore Gentile'];

triggers startend => 'brew', 'homebrew';
triggers start => 'brew install';

spice to => 'http://brewformulas.org/$1.json';
spice proxy_cache_valid => '200 30d';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
