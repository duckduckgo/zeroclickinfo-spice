package DDG::Spice::Gravatar;
# ABSTRACT: Shows gravatar of a given e-mail.

use DDG::Spice;
use Digest::MD5 qw(md5_hex);

primary_example_queries 'gravatar gravatar@duckduckgo.com';
secondary_example_queries 'gravatar duckduckhack';
description "Gravatar profile";
name "Gravatar";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Gravatar.pm";
topics "special_interest", "social";
category "ids";
attribution github => ['https://github.com/adman','Adman'],
            twitter => ['http://twitter.com/adman_X','adman_X'];

triggers startend => "gravatar", "avatar of", "gravatar of";

spice to => 'http://en.gravatar.com/$1.json?callback={{callback}}';

handle remainder => sub {
    #Remove whitespace.
    s/^\s+|\s+$//;
    if($_ =~ /@/) {
        my $email_hash = md5_hex(lc $_);
        return $email_hash if $email_hash;
    } elsif($_) {
        return $_;
    }
    return;
};

1;

