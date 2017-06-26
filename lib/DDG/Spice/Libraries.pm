package DDG::Spice::Libraries;
# ABSTRACT: Search for code on libraries.io

use strict;
use DDG::Spice;

my @blocked_triggers = ('go', 'wordpress', 'emacs', 'julia');
my @triggers_from_file = share('triggers.txt')->slurp;
my @trigger_aliases;
my %alias_hash = ();

foreach my $line (@triggers_from_file){
    chomp($line);
    my @aliases = split(/,/, $line);
    push(@trigger_aliases, @aliases);
    $alias_hash{$aliases[0]} = \@aliases;
}

triggers start => @trigger_aliases;

spice from => '(.+)/(.+)';
spice to => 'https://libraries.io/api/search?platforms=$1&q=$2&api_key={{ENV{DDG_SPICE_LIBRARIES_IO_APIKEY}}}';
spice wrap_jsonp_callback => 1;

# Maps alias to package manger
# wp --> wordpress, go lang --> go
sub get_package_manager {
    my $input = shift;

    return undef if grep(/^$input$/, @blocked_triggers); # go is too ambigious as a trigger

    foreach my $key (keys %alias_hash) {
        if(exists $alias_hash{$key}) {
            my @hash_kv = @{$alias_hash{$key}};
            foreach my $value (@hash_kv) {
                if($input eq $value) {
                    return $key;
                }
            }
        }
    }
}

handle remainder_lc => sub {
    return unless $_;

    my $package_manager = get_package_manager($req->matched_trigger);
    return unless $package_manager;
    return $package_manager, $_;
};

1;
