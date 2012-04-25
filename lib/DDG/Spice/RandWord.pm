package DDG::Spice::RandWord;
use DDG::Spice;

spice is_cached => 0;

sub nginx_conf {
    my $api_key = $ENV{DDG_SPICE_RANDWORD_APIKEY}; 
    return unless defined $api_key;
    $nginx_conf = <<"__END_OF_CONF__";

location ^~ /js/spice/rand_word/ {
    rewrite ^/js/spice/rand_word/(?:([0-9]+)\-([0-9]+)|) /v4/words.json/randomWord?minLength=\$1&maxLength=\$2&api_key=$api_key&callback=ddg_spice_rand_word break;
    proxy_pass http://api.wordnik.com/;
    proxy_cache_valid 418 1d;
}

__END_OF_CONF__
}

triggers any => "random", "word";
handle query_lc => sub {
    if ($_ =~ /^random word(?: ([0-9]+\-[0-9]+)|)$/) {
	if ($1) {
	    return $1;
	} else {
	    return "";
	}
    }
    return;
};
1;
