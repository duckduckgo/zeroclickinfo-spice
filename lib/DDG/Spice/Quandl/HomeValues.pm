package DDG::Spice::Quandl::HomeValues;
# ABSTRACT: Home values for US zipcodes through Quandl

use DDG::Spice;
use Text::Trim;
use YAML::XS 'LoadFile';

# Initially this is will work with zip codes, but will expand
# to other region identifiers

# hash associating triggers with indicator codes
my $trigger_hash = LoadFile(share('home_values_triggers.yml'));

# triggers sorted by length so more specific is used first
my @trigger_keys = sort { length $b <=> length $a } keys(%$trigger_hash);
my $trigger_qr = join "|", @trigger_keys;

# states and metro code mappings
my $state_hash = LoadFile(share('states.yml'));
my @state_keys = sort { length $b <=> length $a } keys(%$state_hash);
my $state_qr = join "|", @state_keys;
my $metro_hash = LoadFile(share('metro.yml'));
my @metro_keys = sort { length $b <=> length $a } keys(%$metro_hash);
my $metro_qr = join "|", @metro_keys;

# defining our triggers
triggers any => @trigger_keys;

# set spice parameters
spice to => 'https://www.quandl.com/api/v1/datasets/ZILL/$1.json?auth_token={{ENV{DDG_SPICE_QUANDL_APIKEY}}}&rows=2';
spice wrap_jsonp_callback => 1;
spice proxy_cache_valid => "418 1d";

handle sub {

    my $query = lc $_;
    
    # will hold region such as "27510", "Carrboro", "North Carolina" etc
    my $region;
    
    # will hold the type of region:  "Z" (zip), "M" (metro), "S" (state) 
    my $indicator_type;

    # checking for 5-digit zip codes
    $_ =~ m/\b(\d{5})\b/;
    if ($1) {
        $region = $1;
        $indicator_type = "Z";
    }
    
    # is it a metropolitan area?
    if (! defined $region) {
        $query =~ m/\b($metro_qr)\b/;
        if (defined $1) {
            $region = $metro_hash->{$1};
            $indicator_type = "M";
        }
    }
    
    # is it a state?
    if (! defined $region) {
        $query =~ m/\b($state_qr)\b/;
        if (defined $1) {
            $region = $state_hash->{$1};
            $indicator_type = "S";
        }
    }
    
    # exit if no region defined
    return unless ($region);
    
    # iterate through trigger phrases
    return unless $query =~ m/\b($trigger_qr)\b/;
    my $trigger = $1;
    return $indicator_type . $region . "_" .  $trigger_hash->{$trigger};
    
};

1;



