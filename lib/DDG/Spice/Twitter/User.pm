package DDG::Spice::Twitter::User;

use DDG::Spice;

spice to => 'https://api.twitter.com/1/statuses/user_timeline/$1.json?include_rts=true&count=1';

triggers query_lc => qr/^(?:@|twitter\s+)([^\s]+)$/;

handle matches => sub {
    my ($uname) = @_;
    return $uname if $uname;
    return;
};

1;
