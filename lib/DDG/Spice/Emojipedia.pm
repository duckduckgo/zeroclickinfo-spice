package DDG::Spice::Emojipedia;

# ABSTRACT: Provide definitions and meanings for emoji characters.

use strict;
use utf8;
use DDG::Spice;

spice is_cached => 1;
spice proxy_cache_valid => "200 1d";

spice wrap_jsonp_callback => 1;

spice to => 'http://api.emojipedia.org/emojis/$1/?api_key={{ENV{DDG_SPICE_EMOJIPEDIA_APIKEY}}}&format=json';

my $emoji_pattern = share("emoji_regex.txt")->slurp(iomode => '<:encoding(UTF-8)');
my $trigger_regex = qr/^(?:${emoji_pattern}(?:\s+(emoji|emojipedia|meaning))?)|(?:emojipedia\s+${emoji_pattern})$/;
triggers query_raw => $trigger_regex;

handle query_raw  => sub {
    return unless $_;
    s/^.*?(${emoji_pattern}).*$/$1/;
    chomp;
    return $_;
};

1;
