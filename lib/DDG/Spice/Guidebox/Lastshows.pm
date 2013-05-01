package DDG::Spice::Guidebox::Lastshows;

use DDG::Spice;


spice to => 'http://api.thetvapi.com/v1.2/json/NdlLbziCtRxn7zQQWIe80beqcthMlP/series/$1/watch/all';

spice wrap_jsonp_callback => 1;

triggers any => "///***never_trigger***///";

handle remainder => sub {
    my %IDS = (
        'NCIS' => 19274,
        'Castle' => 23580,
        'Grimm' => 36833,
    );

    return $IDS{$_} if $_;
    return;
};

1;
