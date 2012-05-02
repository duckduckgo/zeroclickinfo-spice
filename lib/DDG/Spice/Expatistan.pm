package DDG::Spice::Expatistan;

use DDG::Spice;

triggers query_lc => qr/cost of living/;

sub nginx_conf {
    my $api_key = $ENV{DDG_SPICE_EXPATISTAN_APIKEY}; 
    return unless defined $api_key;
	return <<"__END_OF_CONF__";

location ^~ /js/spice/expatistan/ {
    rewrite ^/js/spice/expatistan/(.*) /api/spice?q=\$1&api_key=$api_key break;
    proxy_pass http://www.expatistan.com/;
}

__END_OF_CONF__
}

handle query_lc => sub {
    return $_;
};

1;
