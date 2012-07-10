package DDG::Spice::SongKick;

use DDG::Spice;
use feature "switch";

triggers any => "songkick";

my $base_url = 'http://api.songkick.com/api/3.0/$1.json?query=$1&apikey={{ENV{DDG_SPICE_BIGHUGE_APIKEY}}}&jsoncallback=={{callback}}';

handle query_lc => sub {
    my $query = $_;

    given ($query)    {
        when (/artist/) { $1 = '/search/artists'}
        when (/venue/) { $1 = '/search/venues'}
        when (/location/) { $1 = '/search/locations'}
        when (/event/) { $1 = get_params($query)}
    }

    return;
};

spice to => $base_url

sub get_params {
    given ($_){
        when
    }
}

1;