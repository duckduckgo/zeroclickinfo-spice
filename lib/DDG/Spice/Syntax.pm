package DDG::Spice::Syntax;

# ABSTRACT: Look up syntax for a programming language

use DDG::Spice;

spice is_cached => 1;
spice proxy_cache_valid => "200 1d";

spice wrap_jsonp_callback => 1;
spice to => 'https://syntaxdb.com/api/v1/concepts/search?q=$1';

triggers any => 'syntax', 'syntaxdb', 'syntaxcenter';
my $languages = join "|", share('languages.txt')->slurp;
my $concepts = join "|", share('concept.txt')->slurp;

handle remainder => sub {
    if ($_ =~ m/\b($languages)\b/x && $_ =~ m/\b($concepts)\b/x) {
            return $_;
    }
    return;
};

1;
