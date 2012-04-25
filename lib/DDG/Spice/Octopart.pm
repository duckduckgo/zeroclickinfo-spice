package DDG::Spice::Octopart;

use DDG::Spice;

triggers any => "datasheet";

# no API key; will saturate ratelimiter unless host IPs are whitelisted
# see: http://octopart.com/api/documentation
spice to => 'https://www.octopart.com/api/v2/parts/search?callback={{callback}}&limit=3&optimize.hide_offers=1&optimize.hide_specs=1&q=$1'

handle query_lc => sub {
    if ($_ =~ /^\s*(?:(datasheet))?\s*([\w\-]+)(?:\s(datasheet))?\s*$/i) {
        if ($1 or $3) {
            return $2;
        }
    }
    return;
};

1;
