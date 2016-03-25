package DDG::Spice::FirstRoboticsTeams;

# ABSTRACT: Get info on teams in the FIRST Robotics Competition

# Start at http://docs.duckduckhack.com/walkthroughs/forum-lookup.html if you are new
# to instant answer development

use DDG::Spice;

# Caching - http://docs.duckduckhack.com/backend-reference/api-reference.html#caching
spice is_cached => 1;
spice proxy_cache_valid => "200 1d"; # defaults to this automatically

spice wrap_jsonp_callback => 1; # only enable for non-JSONP APIs (i.e. no &callback= parameter)

# API endpoint - http://docs.duckduckhack.com/walkthroughs/forum-lookup.html#api-endpoint
spice to => 'https://www.thebluealliance.com/api/v2/team/frc$1?X-TBA-App-Id=frc885:search-engine:1';

# Triggers - https://duck.co/duckduckhack/spice_triggers
triggers any => 'frc team', 'first robotics team';

# Handle statement
handle  => sub {

    return $_ if $_;
    return;
};

1;
