package DDG::Spice::Snow;

use DDG::Spice;

spice to => 'http://isitsnowingyet.org/api/check/$1/key/{{ENV{DDG_SPICE_SNOW_APIKEY}}}';

triggers query_lc => qr/snow(?:ing)?/i;

my %snow = map { $_ => undef } (
    'is it going to snow',
    'going to snow',
    'going to snow today',
    'is it snowing',
    'is it snowing here',
    'is it snowing now',
    'is it going to snow here',
    'is it snowing today',
    'is it going to snow today',
    'going to snow today',
);


handle query_lc => sub {    
    my $query = $_;
    my $location = join(" ", $loc->city . ', ', $loc->region_name . ', ', $loc->country_name);

    if(exists $snow{$query}) {
        return $location;
    } elsif($query =~ /^(?:is[ ]it[ ])?
                        (?:going[ ]to[ ])?
                        snow(?:ing)?[ ]?
                        (?:(?:here|now)[ ]?)?
                        (?:in[ ](.*?))?
                        (?:[ ]today)?\??$/ix) {
        $location = $1 || $location;
        return $location;
    }
    return;
};

1;
