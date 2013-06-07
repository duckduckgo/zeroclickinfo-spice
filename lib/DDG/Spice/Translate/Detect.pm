package DDG::Spice::Translate::Detect;

use DDG::Spice;
use Moo;

with('DDG::SpiceRole::Translate');

attribution github  => ['https://github.com/ghedo', 'ghedo'      ],
            web     => ['http://ghedini.me', 'Alessandro Ghedini'];

spice to   => 'http://ws.detectlanguage.com/0.2/detect?q=$1&key={{ENV{DDG_SPICE_DETECTLANGUAGE_APIKEY}}}';
spice wrap_jsonp_callback => 1;

triggers start => "translate";

handle query_lc => sub {
    my $query = $_;

    ##TODO:
    # Find a better way of getting the $lang->local to javascript
    # Currently we parse the API Call script tag and grab the last param
    # https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/share/spice/translate/detect/spice.js#L84

    # Don't need to detect when "from" language is given
    # return if ($query =~ (/from (?:$langs)/));

    $query =~ s/\s+/ /; #merge multiple spaces

    # NEED TO MATCH UNICODE!
    if ($query =~ /^translate (\S+)$/ ) {
        my $phrase = $1;
        # NEED TO ENCODE UNICODE!
        return $phrase;

    # NEED TO MATCH UNICODE!
    } elsif ($query =~ /^translate (\S+) to ($langs)$/) {
        my ($phrase, $to) = ($1, $2);
        # NEED TO ENCODE UNICODE!
        return $phrase;

    } else {
        return;
    }

};

1;