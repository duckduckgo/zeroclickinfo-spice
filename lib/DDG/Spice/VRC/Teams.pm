package DDG::Spice::VRC::Teams;

# ABSTRACT: Get information for registered teams of the current season of the VEX Robotics Competition

use DDG::Spice;

spice is_cached => 1;
spice proxy_cache_valid => "200 1d";
spice to => 'http://api.vexdb.io/v1/get_teams?team=$1';
spice wrap_jsonp_callback => 1;

spice alt_to => {
    skills => {
        is_cached => 1,
        proxy_cache_valid => "200 6h",
        to => 'http://api.vexdb.io/v1/get_skills?team=$1&season=current'
    },
    rankings => {
        is_cached => 1,
        proxy_cache_valid => "200 1h",
        to => 'http://api.vexdb.io/v1/get_rankings?team=$1&season=current'
    }
};

triggers any => 'vex team', 'vex', 'vrc team', 'vrc';

handle remainder => sub {
    return unless $_ =~ /^(\d{1,5}[A-Z]?|[A-Z]{1,5}\d?)$/i;
    return $1;
};

1;
