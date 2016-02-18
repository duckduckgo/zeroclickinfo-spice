package DDG::Spice::JustDeleteMe;

# ABSTRACT: Search JustDelete.Me for the web service

use DDG::Spice;
spice is_cached => 1;
spice wrap_jsonp_callback => 1;
spice to => 'https://raw.githubusercontent.com/rmlewisuk/justdelete.me/master/sites.json';

triggers start => "justdelete", 
                  "delete account", "delete account on", "delete my", "delete my account", "delete my account on", 
                  "cancel account", "cancel account on", "cancel my", "cancel my account", "cancel my account on", 
                  "remove account", "remove account on", "remove my", "remove my account", "remove my account on"; 

handle remainder => sub {
    return unless $_;
};

1;
