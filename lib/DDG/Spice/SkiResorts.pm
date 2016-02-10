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
triggers any => @resorts;

# Handle statement
handle remainder => sub {
    my $resort = $req->matched_trigger;
        
    # Replace spaces with dashes
    $resort =~ s/\s/-/g;
    return $resort
};

1;
