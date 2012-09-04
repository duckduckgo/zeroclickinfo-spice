package DDG::Spice::Gravatar;
# ABSTRACT: Shows gravatar of given e-mail 

use DDG::Spice;
use Digest::MD5 qw(md5_hex);

triggers startend => "gravatar", "avatar of", "gravatar of";

spice to => 'http://gravatar.com/$1.json?callback={{callback}}';

handle remainder => sub {
    my $email_hash = md5_hex(lc $_);
    return $email_hash if defined $email_hash;
    return;
};

1;
