package DDG::Spice::Quandl::WorldBank;

use DDG::Spice;
use Text::Trim;
use YAML::XS 'LoadFile';

# hash associating triggers with indicator codes
my $primary_hash = LoadFile(share('world_bank_primary.yml')); 

# triggers sorted by length so more specific is used first
my @primary_keys = sort { length $b <=> length $a } keys(%$primary_hash);
my $primary_qr = join "|", @primary_keys;

# hash associating secondary triggers with their codes
my $secondary_hash = LoadFile(share('world_bank_secondary.yml'));

# array of secondary triggers
my @secondary_keys = keys(%$secondary_hash);
my $secondary_qr = join "|", @secondary_keys;

# defining our triggers
triggers any => @primary_keys;

# set spice parameters
spice to => 'https://www.quandl.com/api/v1/datasets/WORLDBANK/$1.json?auth_token={{ENV{DDG_SPICE_QUANDL_APIKEY}}}&rows=2';
spice wrap_jsonp_callback => 1;
spice proxy_cache_valid => "418 1d";

handle sub {

    # return if a year is specified
    if ($_ =~ m/(1|2)\d\d\d/) {return;}

    my $query = lc $_;
    
    # find which primary trigger was used
    return unless $query =~ m/\b($primary_qr)\b/;
    my $primary = $1;
    
    # find which secondary trigger was used
    return unless $query =~ m/\b($secondary_qr)\b/;
    my $secondary = $1;
    
    # returning {secondary}_{primary}
    return $secondary_hash->{$secondary} . "_" . $primary_hash->{$primary}
};

1;



