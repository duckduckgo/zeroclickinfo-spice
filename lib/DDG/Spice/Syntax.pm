package DDG::Spice::Syntax;

# ABSTRACT: Look up syntax for a programming language

use DDG::Spice;

# Caching - http://docs.duckduckhack.com/backend-reference/api-reference.html#caching
spice is_cached => 1;
spice proxy_cache_valid => "200 1d"; # defaults to this automatically

spice wrap_jsonp_callback => 1; # only enable for non-JSONP APIs (i.e. no &callback= parameter)

# API endpoint - http://docs.duckduckhack.com/walkthroughs/forum-lookup.html#api-endpoint
spice to => 'https://syntaxdb.com/api/v1/concepts/search?q=$1';

# Triggers - https://duck.co/duckduckhack/spice_triggers
triggers any => 'syntax', 'syntaxdb', 'syntaxcenter';
my $languages = join "|", share('languages.txt')->slurp;
my $concepts = join "|", share('concept.txt')->slurp;

# Handle statement
handle remainder => sub {
    if ($_ =~ m/\b($languages)\b/x) {
        if($_ =~ m/\b($concepts)\b/x) {
            return $_;
        }
    }
    return;
};

1;
