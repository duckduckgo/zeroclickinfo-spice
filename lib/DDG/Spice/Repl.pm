package DDG::Spice::Repl;

use DDG::Spice;
use strict;
use warnings;

use MIME::Base64 qw(encode_base64);

spice is_cached => 1;
spice proxy_cache_valid => '200 1d'; # defaults to this automatically

spice wrap_jsonp_callback => 1;

my $uname = $ENV{DDG_SPICE_REPL_UNAME};
my $passw = $ENV{DDG_SPICE_REPL_PASSW};
# Pass empty string as eol char
my $encoded_uname_pw = encode_base64("$uname:$passw", '');

# Use a garbage endpoint to spoof first API call so we can load JS
spice to => 'https://api.duckduckgo.com?q=hello&format=json';
spice alt_to => {
    repl_eval => {
        to => 'https://eval.repl.it/eval?language=$1&code=$2',
        from => '([^/]+)(?:/(.*))?',
        is_cached => 1,
        proxy_cache_valid => '418 1d',
        headers => {
            Authorization => "Basic $encoded_uname_pw"
        }
    }
};

triggers startend => 'repl', 'repl online', 'online repl', 'interpreter', 'interpreter online', 'online interpreter';

my @langs = qw(
    c
    cpp
    cpp11
    csharp
    fsharp
    go
    java
    nodejs
    php
    python
    python3
    ruby
);

# More Languages Coming Soon...
# apl
# bloop
# brainf
# coffeescript
# emoticon
# fsharp
# go
# java
# jest
# lolcode
# lua
# python_turtle
# qbasic
# roy
# rust
# scheme
# unlambda


my %aliases = (
    'c plus plus' => 'cpp',
    'c sharp' => 'csharp',
    'c#' => 'csharp',
    'c++' => 'cpp',
    'c++11' => 'cpp11',
    'cplusplus' => 'cpp',
    'f sharp' => 'fsharp',
    'f#' => 'fsharp',
    'go lang' => 'go',
    'golang' => 'go',
    'java script' => 'nodejs',
    'js es6' => 'babel',
    'js' => 'node',
    'node.js' => 'nodejs',
    'node' => 'nodejs',
    'python 2' => 'python',
    'python 3' => 'python3',
    'python2' => 'python',
    # 'es6' => 'babel',
    # 'javascript es6' => 'babel',
);

handle remainder => sub {

    return unless $_;
    # strip 'online ' from query
    s/online //;
    return unless $_ ~~ @langs || exists $aliases{$_};
    return $aliases{$_} // $_;
};

1;
