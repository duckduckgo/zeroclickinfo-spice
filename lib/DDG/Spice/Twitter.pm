package DDG::Spice::Twitter;

use DDG::Spice;

spice to => 'http://twitter.com/status/user_timeline/$1.json?callback={{callback}}';

triggers query_lc => qr/^@([^\s]+)$/;
handle matches => sub {
    my $uname = $_ || '';
    return $uname if $uname;
    return;
#	$is_kill_pre_results = 1;
};
1;
