package DDG::Spice::InstantAnswersIndex;
# ABSTRACT: Shows an index of duckduckgo instant answers.

use DDG::Spice;

primary_example_queries "list of ddg instant answers", "list of duckduckgo instant answers";
description "An index of duckduckgo instant answers";
name "Instant Answers Index";
source "https://duck.co/ia";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/InstantAnswersIndex.pm";
topics "special_interest";
category "programming";
attribution github  => ["https://github.com/CalaveraTheNine", "CalaveraTheNine" ];

triggers any => "duckduckgo instant answers", "ddg instant answers", "duckduckgo instant answer", "ddg instant answer";

spice to => 'https://duck.co/ia/json';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
return $_ if $_;
return;
};
1;