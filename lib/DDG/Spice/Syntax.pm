package DDG::Spice::Syntax;

# ABSTRACT: Look up syntax for a programming language

use DDG::Spice;

spice is_cached => 1;
spice proxy_cache_valid => "200 1d";

spice wrap_jsonp_callback => 1;
spice to => 'https://syntaxdb.com/api/v1/concepts/search?q=$1';

triggers any => 'syntax', 'syntaxdb', 'syntaxcenter';

my $languages = join "|", map { quotemeta $_ } split "\n" , share('languages.txt')->slurp ;
my $concepts = join "|", map { quotemeta $_ } split "\n", share('concept.txt')->slurp;

handle remainder => sub {
    if ($_ =~ /\b($languages)\b/ && $_ =~ /\b($concepts)\b/) {
            return $_;
    }
    return;
};

1;
