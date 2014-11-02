package DDG::Spice::ISSLocation;
# ABSTRACT: Returns International Space Station's current location from Open Notify API.

use DDG::Spice;

triggers any => "iss location", "iss position";
spice to => 'http://api.open-notify.org/iss-now.json?callback={{callback}}';


handle remainder => sub {
    return $_ if $_;
};

1;