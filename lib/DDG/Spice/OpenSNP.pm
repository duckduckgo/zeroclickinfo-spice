package DDG::Spice::OpenSNP;

use DDG::Spice;

primary_example_queries 'rs7903146';
description 'Single Nucleotide Polymorphisms';
name 'OpenSNP';
code_url 'https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/OpenSNP.pm';
topics 'science';
category 'reference';
attribution github => ['https://github.com/drsnuggles','Philipp Bayer'],
            twitter => ['https://twitter.com/PhilippBayer', 'PhilippBayer'];

spice to => 'https://opensnp.org/snps/json/annotation/$1.json';
spice proxy_cache_valid  => "5m";
spice wrap_jsonp_callback => 1;

triggers query_lc  => qr/(^rs[0-9]+)$/;

handle query_nowhitespace => sub {
    return $_ if $_;
    return;
};

1;
