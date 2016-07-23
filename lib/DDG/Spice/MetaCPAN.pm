package DDG::Spice::MetaCPAN;
# ABSTRACT: Show a summary of the searched CPAN module.

use strict;
use DDG::Spice;

spice from => '(.*)/(.*)';
spice to => 'https://fastapi.metacpan.org/v1/file/_search?q=$2&callback={{callback}}&size=50';
spice is_cached => 1;
spice proxy_cache_valid => "200 7d";
spice post_body => '{"fields":["documentation","author","abstract.analyzed","release","path","status","indexed","authorized","distribution","date","id","pod_lines"],"query":{"filtered":{"query":{"function_score":{"metacpan_script":"prefer_shorter_module_names_400","query":{"boosting":{"negative_boost":0.5,"negative":{"term":{"mime":{"value":"text/x-script.perl"}}},"positive":{"bool":{"should":[{"term":{"documentation":{"value":"$1","boost":20}}},{"term":{"module.name":{"value":"$1","boost":20}}},{"dis_max":{"queries":[{"query_string":{"fields":["documentation.analyzed^2","module.name.analyzed^2","distribution.analyzed","documentation.camelcase","module.name.camelcase","distribution.camelcase"],"query":"$2","boost":3,"default_operator":"AND","allow_leading_wildcard":0,"use_dis_max":1}},{"query_string":{"fields":["abstract.analyzed","pod.analyzed"],"query":"$2","default_operator":"AND","allow_leading_wildcard":0,"use_dis_max":1}}]}}]}}}}}},"filter":{"and":[{"term":{"status":"latest"}},{"term":{"authorized":1}},{"term":{"indexed":1}},{"or":[{"and":[{"exists":{"field":"module.name"}},{"term":{"module.indexed":1}}]},{"exists":{"field":"documentation"}}]}]}}},"_source":"module"}';

triggers startend => "cpan", "cpanm", "metacpan", "mcpan", "meta cpan", "perl module", "perl dist", "perl distribution", "perl library", "perl lib";

handle remainder => sub {
    if ($_) {
        $_ =~ s/-/::/g;
        $_ = ( grep { /::/ } split /\s+/, $_ )[0] || $_;
        my $clean = $_ =~ s/::/ /gr;
        return $_, $clean;
    }
    return;
};
1;
