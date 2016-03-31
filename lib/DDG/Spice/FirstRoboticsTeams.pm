package DDG::Spice::FirstRoboticsTeams;

# ABSTRACT: Get info on teams in the FIRST Robotics Competition

use DDG::Spice;

spice is_cached => 1;
spice proxy_cache_valid => "200 1d"; # defaults to this automatically

spice wrap_jsonp_callback => 1;

spice to => 'https://www.thebluealliance.com/api/v2/team/frc$1?X-TBA-App-Id=frc885:search-engine:1';

triggers any => 'frc team', 'first robotics team';

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
