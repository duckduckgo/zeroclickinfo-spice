package DDG::Spice::UserAgent;

use DDG::Spice;

triggers startend => "user agent", "user", "agent";

spice call_type => 'self';

handle query_lc => sub {
    return $_ eq 'user agent' ? call : ();
};

1;
