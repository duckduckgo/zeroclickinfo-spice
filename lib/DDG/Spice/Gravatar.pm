package DDG::Spice::Gravatar;
# ABSTRACT: Shows gravatar of a given e-mail.

use DDG::Spice;
use Digest::MD5 qw(md5_hex);

triggers startend => "gravatar", "avatar of", "gravatar of";

spice to => 'http://en.gravatar.com/$1.json?callback={{callback}}';

primary_example_queries 'gravatar gravatar@duckduckgo.com';
description "Gravatar profile";
name "Gravatar";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Gravatar.pm";
topics "special_interest", "social";
category "ids";
attribution github => ['https://github.com/adman','Adman'],
            twitter => ['http://twitter.com/adman_X','adman_X'];

handle remainder => sub {
    #Remove whitespace.
    s/^\s+|\s+$//;
    my $email_hash = md5_hex(lc $_);
    return $email_hash if defined $email_hash;
    return;
};

1;

