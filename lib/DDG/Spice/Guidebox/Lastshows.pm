package DDG::Spice::Guidebox::Lastshows;

use DDG::Spice;


spice to => 'http://api.thetvapi.com/v1.2/json/NdlLbziCtRxn7zQQWIe80beqcthMlP/$1/watch/free';

spice wrap_jsonp_callback => 1;

triggers any => "///***never_trigger***///";

handle remainder => sub {
    my %IDS = (
        'NCIS' => 19274,
        'Castle' => 23580,
        'Grimm' => 36833,
        'Stranger Than Fiction' => 10871,
        'Snatch' => 10074
    );

    my %type = (
        'NCIS' => 'series',
        'Castle' => 'series',
        'Grimm' => 'series',
        'Stranger Than Fiction' => 'movie',
        'Snatch' => 'movie'
    );

    return $type{$_}, $IDS{$_} if $_;
    return;
};

1;
