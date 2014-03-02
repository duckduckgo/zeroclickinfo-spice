package DDG::Spice::CodeSearch;

use DDG::Spice;

triggers startend => "code", "example";

spice to => 'http://searchco.de/api/jsonp_codesearch_I/?q=$1&callback={{callback}}';

primary_example_queries "javascript console.log example";
description "Code search";
name "CodeSearch";
icon_url "/i/searchco.de.ico";
source "search[code]";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/CodeSearch.pm";
topics "sysadmin", "programming";
category "programming";
attribution github => ['https://github.com/boyter','Ben Boyter'],
           twitter => ['http://twitter.com/boyter','boyter'];

handle remainder => sub {

    my @languages_list = share('languages.txt')->slurp;
    my $languages      = join "|", @languages_list;
   
    if ($_ =~ m/\b($languages)\b/) {
	    my $match = $1;

	    $match =~ s/\+/\\+/g;

	    s/\s*$match\s*//i;

	    return "lang:".$match." ".$_;
    }
    return;
};

1;
