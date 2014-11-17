package DDG::Spice::InEveryLang;
# ABSTRACT: Returns code examples for popular coding puzzles

use DDG::Spice;

primary_example_queries "Hello World in C";
description "Shows a code puzzle example";
name "InEveryLang";
source "ineverylang.com";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/InEveryLang.pm";
topics "programming";
category "programming";
attribution github  => ['https://github.com/josephwegner', 'josephwegner'],
            twitter => ['https://www.twitter.com/Joe_Wegner', 'Joe_Wegner'];

triggers query_lc => qr/(hello,? world)\!?|(fizz ?buzz)|(quine)|(fibonacci sequqnce)|(binary search)/;

spice to => 'http://www.ineverylang.com/$1.json';
spice wrap_jsonp_callback => 1;

handle matches => sub {
  if ($1) {
    return 'hello-world'
  } elsif($2) {
    return 'fizz-buzz';
  } elsif($3) {
    return 'quine';
  } elsif ($4) {
    return 'fibonacci sequence';
  } elsif ($5) {
    return 'binary-search';
  } else {
    return;
  }
};

1;
