package DDG::Spice::Gravatar;
# ABSTRACT: Shows gravatar of a given e-mail.

use strict;
use DDG::Spice;
use Digest::MD5 qw(md5_hex);

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
