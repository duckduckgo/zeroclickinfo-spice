package DDG::Spice::LeakDB;
# ABSTRACT: Plaintext of hashes, and hashes of plaintexts

use strict;
use DDG::Spice;

triggers startend => 'hashme', 'leakdb';
spice to => 'http://api.leakdb.abusix.com/?j=$1';
spice wrap_jsonp_callback => 1;

handle remainder => sub{
    return if $_ eq '';
    return $_;
};

1;

