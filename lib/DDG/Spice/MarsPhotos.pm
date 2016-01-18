package DDG::Spice::MarsPhotos;
use DDG::Spice;

spice is_cached => 1;
spice proxy_cache_valid => "200 1d";
spice wrap_jsonp_callback => 1;

# get real key later
spice to => 'https://api.nasa.gov/mars-photos/api/v1/rovers/$1/photos?earth_date=$2&api_key=DEMO_KEY';
spice from => '([^/]+)/?(?:([^/]+)/?(?:([^/]+)|)|)';

triggers any => 'mars images', 'mars photos';

handle remainder => sub {
    my $remainder = $_;
    my ($rover) = $remainder =~ /(curiosity|spirit|opportunity)/i;
    $rover //= "curiosity";

    # date needs to be yyyy-mm-dd
    my $date = $remainder;
    $date =~ s/$rover//;

    # get yesterdays date
    if(!$date){
        my @parts = localtime(time);
        my ($day, $month, $year) = @parts[3..5];
        $year += 1900;
        $month += 1;
        $day -= 1;
        $date = qq($year-$month-$day);
    }
    
    return $rover,$date;
};

1;
