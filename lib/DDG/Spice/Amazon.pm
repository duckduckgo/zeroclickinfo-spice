package DDG::Spice::Amazon;

use DDG::Spice;

spice to => 'https://duckduckgo.com/m.js?q=$1&cb=ddg_spice_amazon';

# trigger on source name
my @source_triggers = ('amazon');

# triggers to pluralize
my @pluralize_triggers = ('product');

# agglomerate triggers
my @triggers = (@source_triggers, @pluralize_triggers, map { $_.'s' } @pluralize_triggers);

# set triggers
#triggers startend => @triggers;

# 2014.05.19 (ct): deep spice.
triggers start => 'amazon';

handle remainder => sub {
    return "$_" if $_;
};

1;

