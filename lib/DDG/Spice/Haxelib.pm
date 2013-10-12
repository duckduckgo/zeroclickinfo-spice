package DDG::Spice::Haxelib;

use DDG::Spice;

primary_example_queries "haxelib openfl";
description "Lookup packages from the Haxe libraries";
name "Haxelib";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Haxelib.pm";
topics "programming";
category "programming";
spice to => 'http://haxelib-json.herokuapp.com/package/$1?callback={{callback}}';

attribution github => ['https://github.com/TopHattedCoder','TopHattedCoder'];

triggers any => "haxelib", "haxe lib", "haxe library";
spice proxy_cache_valid => "200 1d";
handle remainder => sub {
    return $_ if $_;
    return;
};

1;

