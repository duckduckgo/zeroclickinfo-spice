package DDG::Spice::SkiResorts;

# ABSTRACT: Displays information on ski resorts

# Start at http://docs.duckduckhack.com/walkthroughs/forum-lookup.html if you are new
# to instant answer development

use DDG::Spice;
use JSON;

# Configuration
spice is_cached => 1;
spice proxy_cache_valid => "200 1d"; # defaults to this automatically
spice wrap_jsonp_callback => 1; # only enable for non-JSONP APIs (i.e. no &callback= parameter)

# API endpoint
spice to => 'http://www.piste.io/info/$1.json';

# Load in resort list for triggers
my $data = share('resorts.json')->slurp;
my @resorts = @{decode_json($data)};
@resorts = map { $_ =~s/-/ /g; $_; } @resorts; # Replace dashes with spaces

# Define triggers (will only trigger in conjustion with resort name, e.g. Ski Heavenly)
triggers startend => "ski", "skiing", "snowboarding", "map", "piste map", "resort map";

# Handle statement
handle remainder_lc => sub {
    # Find first matching resort
    my $resort = '';
    foreach my $i (0..$#resorts) {
        next if $_ !~ /$resorts[$i]/;
        $resort = $resorts[$i];
        $resort =~ s/\s/-/g; # Replace spaces with dashes
        last; # Have match, exit
    }
    
    return unless $resort;
    return $resort;
};

1;
