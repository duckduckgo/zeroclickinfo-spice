package DDG::Spice::JustDeleteMe;

# ABSTRACT: Search JustDelete.Me for the web service

use DDG::Spice;
spice is_cached => 1;
spice wrap_jsonp_callback => 1;
spice to => 'https://raw.githubusercontent.com/rmlewisuk/justdelete.me/master/sites.json';

my @tr = qw (delete cancel remove);
my @my = map {"$_ my"} @tr;
my @acc = map { "$_ account" } (@tr, @my);
my @on = map {"$_ on"} @acc;
my @all = (@my, @acc, @on);
triggers any => @all;

handle remainder => sub {
    $_ =~ s/,//ig;
    return unless $_;
};

1;
