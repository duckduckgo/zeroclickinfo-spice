package DDG::Spice::MetaCPAN;
# ABSTRACT: Show a summary of the searched CPAN module.

use strict;
use DDG::Spice;

spice from => '(.*)/(.*)';
spice to => 'http://api.metacpan.org/v0/file/_search?dummy=$2&callback={{callback}}&size=50';
spice is_cached => 1;
spice proxy_cache_valid => "200 7d";
spice post_body => '{"fields":["date","module","distribution","abstract","description","author","release"],"query":{"filtered":{"filter":{"and":[{"not":{"filter":{"or":[{"term":{"file.distribution":"perl_debug"}},{"term":{"file.distribution":"perl-5.005_02+apache1.3.3+modperl"}},{"term":{"file.distribution":"pod2texi"}},{"term":{"file.distribution":"perlbench"}},{"term":{"file.distribution":"spodcxx"}},{"term":{"file.distribution":"Bundle-Everything"}}]}}},{"term":{"status":"latest"}},{"term":{"file.authorized":true}},{"term":{"file.indexed":true}},{"or":[{"and":[{"exists":{"field":"file.module.name"}},{"term":{"file.module.indexed":true}}]},{"exists":{"field":"documentation"}}]}]},"query":{"custom_score":{"query":{"boosting":{"negative_boost":0.5,"positive":{"bool":{"should":[{"term":{"file.documentation":{"boost":20,"value":"$1"}}},{"term":{"file.module.name":{"boost":20,"value":"$1"}}},{"dis_max":{"queries":[{"query_string":{"fields":["documentation.analyzed^2","file.module.name.analyzed^2","distribution.analyzed","documentation.camelcase","file.module.name.camelcase","distribution.camelcase"],"boost":3,"query":"$2","allow_leading_wildcard":false,"default_operator":"AND","use_dis_max":true}},{"query_string":{"fields":["abstract.analyzed","pod.analyzed"],"query":"$2","allow_leading_wildcard":false,"default_operator":"AND","use_dis_max":true}}]}}]}},"negative":{"term":{"file.mime":{"value":"text/x-script.perl"}}}}},"metacpan_script":"prefer_shorter_module_names_400"}}}}}';

triggers startend => "cpan", "cpanm", "metacpan", "mcpan", "meta cpan", "perl module", "perl dist", "perl distribution", "perl library", "perl lib";

handle remainder => sub {
    if ($_) {
        $_ =~ s/-/::/g;
        my $clean = $_ =~ s/::/ /gr;
        return $_, $clean;
    }
    return;
};
1;
