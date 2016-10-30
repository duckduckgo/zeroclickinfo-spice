package DDG::Spice::Translate;

# ABSTRACT: Text Translator

# Start at http://docs.duckduckhack.com/walkthroughs/forum-lookup.html if you are new
# to instant answer development

use DDG::Spice;
use strict;
use warnings;

spice wrap_jsonp_callback => 1;
spice to => 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=$1';

triggers start => 'translate', 'translate english';

# Handle statement
handle remainder => sub {

    # Query is in $_ or @_, depending on the handle you chose...if you
    # need to do something with it before returning
    return $_ if $_;
    return '';
};

1;