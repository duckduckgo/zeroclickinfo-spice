package DDG::Spice::Quandl::WorldBank;

use DDG::Spice;
use Text::Trim;
use YAML::XS qw( Load );

# meta data
primary_example_queries "world population";
secondary_example_queries "flooding in the US";
description "Returns data collected by the World Bank";
name "World Bank";
code_url "https://github.com/brianrisk/zeroclickinfo-spice";
icon_url "https://www.quandl.com/favicon.ico";
topics "economy_and_finance", "geography", "social";
category "facts";
attribution web => ["https://www.quandl.com", "Quandl"],
            twitter => "quandl";
            
# hash associating triggers with indicator codes
my $primary_hash = Load(scalar share('world_bank_primary.yml')->slurp); 

# triggers sorted by length so more specific is used first
my @primary_keys = sort { length $b <=> length $a } keys($primary_hash);

# hash associating secondary triggers with their codes
my $secondary_hash = Load(scalar share('world_bank_secondary.yml')->slurp);

# array of secondary triggers
my @secondary_keys = keys($secondary_hash);

# defining our triggers
triggers startend => @primary_keys;

# to set an environmental variable:
# duckpan env set <name> <value>

# set spice parameters
spice to => 'http://quandl.com/api/v1/datasets/WORLDBANK/$1.json?auth_token={{ENV{DDG_SPICE_QUANDL_APIKEY}}}&rows=2';
spice wrap_jsonp_callback => 1;
spice proxy_cache_valid => "418 1d";

handle sub {

    my $query = lc $_;
    
    # find which secondary trigger was used
    my $secondary;
    for my $trigger (@secondary_keys) {
        if ( $query =~ /\b$trigger\b/ ) {
            $secondary = $trigger;
            last;
        }
    };
    
    # exiting if no secondary trigger
    return unless $secondary;
     
    # find which primary trigger was used
    my $primary;
    for my $trigger (@primary_keys) {
        if ( $query =~ /\b$trigger\b/ ) {
            $primary = $trigger;
            last;
        }
    };
    
    # exiting if no primary trigger (though this should not happen)
    return unless $primary;
    
    # returning {secondary}_{primary}
    return $secondary_hash->{$secondary} . "_" . $primary_hash->{$primary}
};

1;



