package DDG::Spice::Twitter;

use DDG::Spice;

spice to => 'http://twitter.com/status/user_timeline/$1.json?callback={{callback}}';

triggers query_lc => qr/^(?:@|twitter\s+)([^\s]+)$/;

handle matches => sub {
    my ($uname) = @_;
    return $uname if $uname;
    return;
};

1;
