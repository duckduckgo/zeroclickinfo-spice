package DDG::Spice::InEveryLang;
# ABSTRACT: Returns code examples for popular coding puzzles

use DDG::Spice;

primary_example_queries "Fizz Buzz in C";
description "Shows a code puzzle example";
name "InEveryLang";
source "ineverylang.com";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/InEveryLang.pm";
topics "programming";
category "programming";
attribution github  => ['https://github.com/josephwegner', 'josephwegner'],
            twitter => ['https://www.twitter.com/Joe_Wegner', 'Joe_Wegner'];

triggers startend => "fizz buzz", "fizzbuzz", "quine", "fiboniacci sequence", "binary search";

spice to => 'http://www.ineverylang.com/$1.json';
spice wrap_jsonp_callback => 1;

handle query_lc => sub {
  $_ =~ m/(fizz ?buzz)|(quine)|(fibonacci sequence)|(binary search)/;
  if($1) {
    return 'fizz-buzz';
  } elsif($2) {
    return 'quine';
  } elsif ($3) {
    return 'fibonacci-sequence';
  } elsif ($4) {
    return 'binary-search';
  } else {
    return;
  }
};

1;
