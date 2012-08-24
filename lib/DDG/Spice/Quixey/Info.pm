package DDG::Spice::Quixey::Info;

use DDG::Spice;

triggers start => "///***never_trigger***///";

spice from => '([^/]+)/([^/]+)/([^/]+)';
spice to => 'https://api.quixey.com/1.0/get_app?partner_id=2073823582&partner_secret={{ENV{DDG_SPICE_QUIXEY_TESTING_APIKEY}}}&app_id=$1&search_id=$2&session_id=$3&callback={{callback}}';

handle remainder => sub {
    return;
};

1;