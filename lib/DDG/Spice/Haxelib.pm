package DDG::Spice::Haxelib;
# ABSTRACT: Returns library information from Haxelib's repository.

use strict;
use DDG::Spice;

triggers any => "haxelib", "haxe lib", "haxe library", "lib haxe", "lib.haxe", "libhaxe", "lib.haxe.org", "libhaxe.org";
spice to => 'http://haxelib-json.herokuapp.com/package/$1?callback={{callback}}';

handle remainder => sub {
    return $_ if $_;
    return;
};

1;

