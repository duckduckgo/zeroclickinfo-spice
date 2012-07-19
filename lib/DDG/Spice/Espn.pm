package DDG::Spice::Espn;

use DDG::Spice;

attribution web => ['http://dylansserver.com','Dylan Lloyd'],
            email => ['dylan@dylansserver.com','Dylan Lloyd'];

triggers any => "espn";

spice to => 'http://api.espn.com/v1/sports/$1?apikey={{ENV{DDG_SPICE_ESPN_APIKEY}}}&callback={{callback}}';

spice is_cached => 0;

handle query_lc => sub {
    return "";
};

1;
