package DDG::Spice::SongKick;

use DDG::Spice;
use feature "switch";

triggers any => "songkick";

my $base_url = 'http://api.songkick.com/api/3.0/###TEMPLATE###.json?query=$1&apikey={{ENV{DDG_SPICE_BIGHUGE_APIKEY}}}&jsoncallback=={{callback}}';

handle query_lc => sub {
    my $query = $_;
    my $query_type;

    given ($query)    {
        when (/artist/) { $query_type = '/search/artists'}
        when (/venue/) { $query_type = '/search/venues'}
        when (/location/) { $query_type = '/search/locations'}
        when (/event/) { $query_type = get_params($query)}
    }

    $base_url =~ s/###TEMPLATE###/$query_type/;

    spice to => $base_url;

    return 'yahoo'; 
};

sub get_params {
    # given ($_){
    #     when
    # }

    return '/thisTest/';
};

1;