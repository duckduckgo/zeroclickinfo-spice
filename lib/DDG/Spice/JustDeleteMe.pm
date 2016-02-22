package DDG::Spice::JustDeleteMe;

# ABSTRACT: Search JustDelete.Me for the web service

use DDG::Spice;
spice is_cached => 1;
spice wrap_jsonp_callback => 1;
spice to => 'https://raw.githubusercontent.com/rmlewisuk/justdelete.me/master/sites.json';

my $MIN_QUERY_LENGTH = 4;
my @tr = qw (delete cancel remove);
my @pred = qw (my on how to howto can i one his her their theirs a an permanently from of);
my @req = qw (account accounts);
triggers any => @tr;

handle query_parts => sub {
    my $query = validate(@_);
    if (length($query) < $MIN_QUERY_LENGTH) {
        return;
    }
    else {
        return $query;
    }
};

sub validate {
    my @qparts = @_;
    my @trigs = (@tr, @pred);
    my @required;
    # strip triggers and preds
    for (my $i = 0; $i<scalar(@trigs); $i++) {
        @qparts = grep(!/^($trigs[$i]\W*)$/i, @qparts);
    }
    # check for required words
    for (my $i = 0; $i<scalar(@req); $i++) {
        @required = (@required, grep(/^($req[$i]\W*)$/i, @qparts));
    }
    #strip required words and return rest as string
    if (scalar(@required) > 0) {
        for (my $i = 0; $i<scalar(@req); $i++) {
            @qparts = grep(!/^($req[$i]\W*)$/i, @qparts);
        }
        return join(" ", @qparts);
    }
    return "";
}

1;
