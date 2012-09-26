package DDG::Spice::Octopart;

use DDG::Spice;

triggers any => "datasheet";

# see: http://octopart.com/api/documentation
sub nginx_conf {
    my $api_key = $ENV{DDG_SPICE_OCTOPART_APIKEY}; 
    return unless defined $api_key;
    $nginx_conf = <<"__END_OF_CONF__";

location ^~ /js/spice/octopart/ {
    rewrite ^/js/spice/octopart/(.*) /api/v2/parts/search?callback=ddg_spice_octopart&apikey=$api_key&limit=3&optimize.hide_offers=1&optimize.hide_specs=1&q=$1 break;
    proxy_pass https://www.octopart.com/;
}

__END_OF_CONF__
}

handle query_lc => sub {
    if ($_ =~ /^\s*(?:(datasheet))?\s*([\w\-]+)(?:\s(datasheet))?\s*$/i) {
        if ($1 or $3) {
            return $2;
        }
    }
    return;
};

1;
