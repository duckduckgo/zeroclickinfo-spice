package DDG::Spice::OpenNIC;
# ABSTRACT: Displays The nearest OpenNIC DNS servers

use DDG::Spice;
spice is_cached => 1;

# Metadata
name "OpenNIC";
source "OpenNIC API";
description "Search for OpenNIC DNS using some criteras";
primary_example_queries "opennic", "neutral dns" , "censor-free dns";
secondary_example_queries "opennic 42.42.42.42", "opennic ipv6", "opennic ipv6 42.42.42.42";
category "programming";
topics "sysadmin";

# Code info
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/OpenNIC.pm";
attribution github  => ["cylgom", "cylgom"], # it's me
            web     => ['http://cylgom.net', 'cylgom'],
            twitter => "cylgom";
            
# OpenNIC API endpoint
# We prepare a 'spice from' with the place for 5 arguments
spice from => '([^/]+)/?(?:([^/]+)/?(?:([^/]+)/?(?:([^/]+)/?(?:([^/]+)|)|)|)|)';
spice to => 'https://api.opennicproject.org/geoip/?json&lat=$2&lon=$3&ipv=$4&res=4&ip=$5';
spice wrap_jsonp_callback => 1;

# Triggers
triggers any => "neutral dns", "opennic", "open nic", "censor free dns";

# Handle statement
handle remainder => sub {
    my $ipv; 
    my $ip;
    my $lat;
    my $lon;
    my $unit;

    # ip version
    # user asked ipv4 (or ip4)
    if ($_ =~ /ipv?4/) {
        $ipv='4';
    }
    # user asked ipv6 (or ip6)
    elsif ($_ =~ /ipv?6/) {
        $ipv='6';
    }
    # user didn't ask => collect both
    else {
        $ipv="all";
    }

    # target ip for detection :
    # user-forced (ipv4 regex from stackoverflow, id : 53497)
    if ($_ =~ /(((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/){ 
        $ip=$1;
        # Unused parameters are set to 0, not left null or undeclared
        # (they will be overloaded by the ip in the API )
        $lat = '0';
        $lon = '0';
    }
    # user-position (do not trigger the IA if we can't determine the user's position)
    elsif( defined($loc) && exists($loc->{latitude}) && exists($loc->{longitude}) ){
        # The unused parameter is set null to avoid overloading the coordinates.
        # It doesn't have any side effect on other arguments as "ip" is the last one.
        $ip= '';                
        $lat = $loc->latitude;
        $lon = $loc->longitude;
    }
    else{
        return;
    }
    
    # This is used to determine the distance unit later (see .js)
    if( defined($loc) && exists($loc->{country_code}) ){
        $unit = $loc->country_code;
    }
    else{
        $unit = "KM"
    }
    
    #      extra  $2    $3    $4    $5   
    return $unit, $lat, $lon, $ipv, $ip;
};

1;
