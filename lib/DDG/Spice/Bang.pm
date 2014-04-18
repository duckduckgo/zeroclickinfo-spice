package DDG::Spice::Bang;

use DDG::Spice;

triggers query_lc => qr/^\?[A-Za-z0-9.-]+$/;

spice call_type => 'self';

handle query => sub {
    return '' if $_;
    return;
};

1;
