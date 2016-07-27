package DDG::Spice::MetaCPAN;
# ABSTRACT: Show a summary of the searched CPAN module.

use strict;
use DDG::Spice;

spice from => '(.*)/(.*)';
spice to => 'https://fastapi.metacpan.org/v1/file/_search?callback={{callback}}&size=50';
spice is_cached => 1;
spice proxy_cache_valid => "200 7d";
spice post_body => '{"_source":"module","fields":["date","module.name","distribution","abstract","description","author","release"],"query":{"filtered":{"filter":{"and":[{"not":{"filter":{"or":[{"term":{"file.distribution":"Bundle-Everything"}}]}}},{"term":{"status":"latest"}},{"term":{"authorized":1}},{"term":{"indexed":1}},{"or":[{"and":[{"exists":{"field":"module.name"}},{"term":{"module.indexed":1}}]},{"exists":{"field":"documentation"}}]}]},"query":{"function_score":{"query":{"boosting":{"negative_boost":0.5,"positive":{"bool":{"should":[{"term":{"documentation":{"boost":100,"value":"$1"}}},{"term":{"module.name":{"boost":100,"value":"$1"}}},{"dis_max":{"queries":[{"query_string":{"fields":["documentation.analyzed^2","module.name.analyzed^2","distribution.analyzed","documentation.camelcase","module.name.camelcase","distribution.camelcase"],"boost":3,"query":"$2","allow_leading_wildcard":0,"default_operator":"AND","use_dis_max":1}},{"query_string":{"fields":["abstract.analyzed","pod.analyzed"],"query":"$2","allow_leading_wildcard":0,"default_operator":"AND","use_dis_max":1}}]}}]}},"negative":{"term":{"mime":{"value":"text/x-script.perl"}}}}},"metacpan_script":"prefer_shorter_module_names_400"}}}}}';

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
