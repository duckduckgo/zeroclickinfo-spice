package DDG::Spice::GfyCat;
# ABSTRACT: Returns link and information about a GfyCat video and/or gif.

use strict;
use DDG::Spice;
name "GfyCat Info";
source "GfyCat";
icon_url "/i/gfycat.com.ico";
description "Get info about a gif/video";
primary_example_queries "gfycat scarygrizzledcomet", "gfy scarygrizzledcomet";
secondary_example_queries "gfy cat scarygrizzledcomet";
category "reference";
topics "gaming", "entertainment";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/GfyCat.pm";
attribution github => ["https://github.com/greenbeard/", "GreenBeard"];

triggers startend => 'gfycat', 'gfy cat', 'gfy';

spice to => 'http://gfycat.com/cajax/get/$1';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return $_ if $_;
    return;
};
1;
