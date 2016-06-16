package DDG::Spice::FirstRobotics::TeamInfo;

# ABSTRACT: Get info on teams in the FIRST Robotics Competition

use DDG::Spice;

spice is_cached => 1;
spice proxy_cache_valid => "200 1d"; # defaults to this automatically

spice wrap_jsonp_callback => 1;

spice to => 'https://www.thebluealliance.com/api/v2/team/frc$1?X-TBA-App-Id=duckduckgo:search-engine:1';

# Obtain the years a team has competed
spice alt_to => {
    years_competed => {
        is_cached => 1,
        proxy_cache_valid => "200 1d",
        to => 'https://www.thebluealliance.com/api/v2/team/frc$1/years_participated?X-TBA-App-Id=duckduckgo:search-engine:1'
    }
};

triggers startend => 'frc', 'frc team', 'first robotics team', 'first robotics competition';

handle remainder_lc => sub {

    # only continue if the query contains digits
    return unless /\d+/;
    
    # guard against "top 10 teams" type queries
    return if ($req->query_clean =~ /\d+\s*(?:top|best|highest)/
                || $req->query_clean =~ /(?:top|best|highest(?:\sranked)?)\s*\d+/);
    
    s/\D+//g; # strip all non-digits, leaving a team number for the API
    
    return $_ if $_;
    
    return;
};

1;
