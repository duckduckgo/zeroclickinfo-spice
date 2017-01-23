package DDG::Spice::Repl;

use DDG::Spice;
use strict;
use warnings;

use MIME::Base64 qw(encode_base64);

my $uname = $ENV{DDG_SPICE_REPL_UNAME} || '';
my $passw = $ENV{DDG_SPICE_REPL_PASSW} || '';
# Pass empty string as eol char
my $encoded_uname_pw = encode_base64("$uname:$passw", '');

spice call_type => 'self';

spice alt_to => {
    repl_eval => {
        to => 'https://eval.repl.it/eval?language=$1&code=$2',
        from => '([^/]+)/([^/]+)',
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
    lua
    nodejs
    php
    python
    python3
    ruby
    rust
    swift
);

# More Languages Coming Soon...
# apl
# bloop
# brainf
# coffeescript
# emoticon
# jest
# lolcode
# python_turtle
# qbasic
# roy
# scheme
# unlambda


my @aliases = (
    'c plus plus',
    'c sharp',
    'c#',
    'c++ 11',
    'c++',
    'c++11',
    'cplusplus',
    'es6',
    'f sharp',
    'f#',
    'go lang',
    'golang',
    'java script',
    'javascript es6',
    'javascript',
    'js es6',
    'js',
    'node.js',
    'node',
    'python 2',
    'python 3',
    'python2'
);

my @allowed = (@langs, @aliases);

handle remainder_lc => sub {

    return unless $_;
    # strip 'online ' from query
    s/(online|interpreter) //g;
    return unless $_ ~~ @allowed;
    return '';
};

1;
