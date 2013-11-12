package DDG::Spice::Haxelib;

# ABSTRACT: Returns library information from Haxelib's repository.

use DDG::Spice;

primary_example_queries "haxelib openfl";
description "Lookup packages from the Haxe libraries";
name "Haxelib";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Haxelib.pm";
icon_url "/i/www.haxe.org.ico";
topics "programming";
category "programming";
spice to => 'http://haxelib-json.herokuapp.com/package/$1?callback={{callback}}';

attribution github => ['https://github.com/TopHattedCoder','TopHattedCoder'];

triggers any => "haxelib", "haxe lib", "haxe library";
handle remainder => sub {
    return $_ if $_;
    return;
};

1;

