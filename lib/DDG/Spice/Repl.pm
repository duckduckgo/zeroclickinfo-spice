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
my $encoded_uname_pw = encode_base64("$uname:$passw");

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
    apl
    bloop
    brainf
    c
    csharp
    cpp
    cpp11
    coffeescript
    emoticon
    babel
    fsharp
    forth
    go
    java
    javascript
    jest
    lolcode
    lua
    nodejs
    php
    python
    python_turtle
    python3
    qbasic
    roy
    ruby
    rust
    scheme
    swift
    unlambda
);
# web_project

my %aliases = (
    'brain fuck' => 'brainf',
    'brainfuck' => 'brainf',
    'c#' => 'csharp',
    'c++' => 'cpp',
    'c++11' => 'cpp11',
    'coffee script' => 'coffeescript',
    'css' => 'web_project',
    'es6' => 'babel',
    'f#' => 'fsharp',
    # 'html' => 'web_project',
    'java script' => 'javascript',
    'javascript es6' => 'babel',
    'js es6' => 'babel',
    'js' => 'javascript',
    'node.js' => 'nodejs',
    'node' => 'nodejs',
    'python 2' => 'python',
    'python2' => 'python',
    'python 3' => 'python3',
    'python turtle' => 'python_turtle',
    'python with turtle' => 'python_turtle',
);

handle remainder => sub {

    return unless $_;
    # strip 'online ' from query
    s/online //;
    return unless $_ ~~ @langs || exists $aliases{$_};
    return $aliases{$_} // $_;
};

1;
