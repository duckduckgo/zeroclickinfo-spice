package DDG::Spice::Xkcd;

use DDG::Spice;

triggers startend => "xkcd";

sub nginx_conf {
    $nginx_conf = <<"__END_OF_CONF__";    
    location ^~ /js/spice/xkcd/ {
	echo_before_body 'ddg_spice_xkcd(';
	rewrite ^/js/spice/xkcd/(.*) /api-0/jsonp/comic/\$1 break;
	proxy_pass http://dynamic.xkcd.com/;
	echo_after_body ');';
    }

__END_OF_CONF__
}


handle query_lc => sub {
    if ($_ eq 'xkcd' || $_ =~ /^xkcd (\d+)$/) {
	if ($1) {
	    return $1;
	} else {
	    return '';
	}
    }
};

1;
