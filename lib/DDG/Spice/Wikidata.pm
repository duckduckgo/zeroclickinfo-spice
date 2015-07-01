package DDG::Spice::Wikidata;
# ABSTRACT: Uses Wikidata to answer simple questions

use strict;
use DDG::Spice;
use Text::Trim;

name "Wikidata";
source "Wikidata";
icon_url "https://www.wikidata.org/static/favicon/wikidata.ico";
description "Answer simple questions for properties on subjects";
primary_example_queries "population of Germany", "mayor of munich", "president of the United States", "children of Barack Obama", "spouse of Angelina Jolie";
category "facts";
topics "everyday";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Wikidata.pm";
attribution github => ["Benestar", "Bene*"],
            twitter => "benestar_wm";

spice to => 'http://tools.wmflabs.org/bene/ddg-backend/?subject=$1&property=$2';
spice from => '(.*)/(.*)';
spice wrap_jsonp_callback => 1;

triggers any => "of";

# Handle statement
handle query_lc => sub {
    return unless $_ =~ /^(who|what|which)?\s*(is|are|was|were)?\s*(the|a|an)?\s*(?<property>\b.*?)\s+of\s+(the|a|an)?\s*(?<subject>\b.*)$/i;
    return unless $+{subject} and $+{property};
    return trim($+{subject}), trim($+{property});
};

1;
