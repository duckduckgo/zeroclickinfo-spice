package DDG::Spice::FirstRoboticsTeams;

# ABSTRACT: Get info on teams in the FIRST Robotics Competition

use DDG::Spice;

spice is_cached => 1;
spice proxy_cache_valid => "200 1d"; # defaults to this automatically

spice wrap_jsonp_callback => 1;

spice to => 'https://www.thebluealliance.com/api/v2/team/frc$1?X-TBA-App-Id=duckduckgo:search-engine:1';

triggers any => 'frc', 'frc team', 'first robotics team', 'first robotics competition';

handle remainder => sub {

    # only continue if the query contains digits
    return unless /\d+/;
    
    # eliminate irrelevant queries containing 'frc'
    return if ($req->query_clean =~ /frc/ 
                && $req->query_clean !~ /frc\s*(?:team)?\s*\d+/
                && $req->query_clean !~ /\d+\s*frc\s*(?:team)?/);
    
    s/\D+//g; # strip all non-digits, leaving a team number for the API
    
    return $_ if $_;
    
    return;
};

1;
