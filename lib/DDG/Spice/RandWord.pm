package DDG::Spice::RandWord;
use DDG::Spice;

sub nginx_conf {
    my $api_key = $ENV{WORDNIK_API_KEY};
    $nginx_conf = <<"__END_OF_CONF__";

location ^~ /js/spice/rand_word/ {
    rewrite ^/js/spice/rand_word/(?:([0-9]+)\-([0-9]+)|) /v4/words.json/randomWord?minLength=$1&maxLength=$2&api_key=$api_key&callback=ddg_spice_rand_word break;
    proxy_pass http://api.wordnik.com/;
}
    
__END_OF_CONF__
}

triggers any => "random", "word";
#spice is_memcached => 0;
handle query_lc => sub {
    if ($_ =~ /^random word(?: ([0-9]+\-[0-9]+)|)$/) {
	if ($1) {
	    return $1;
	} else {
	    return;
	}
#	$is_kill_pre_results = 1;
    }
    return;
};
1;
