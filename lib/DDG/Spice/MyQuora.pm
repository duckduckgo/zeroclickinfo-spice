package DDG::Spice::MyQuora;

use DDG::Spice;

spice is_cached => 0;

spice to => 'http://api.quora.com/api/logged_in_user?fields=inbox,notifs&callback={{callback}}';

triggers any => 'myquora';

handle remainder => sub {
	return if (@_ eq 'inbox,notifs')
};

1;

