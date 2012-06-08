package DDG::Spice::Facebook;
# ABSTRACT: Searches for facebook users and pages

use DDG::Spice;

triggers startend => "fb", "facebook";

spice to => 'http://graph.facebook.com/$1&callback={{callback}}';

handle remainder => sub {
    print $_;   
    $_ =~ s/ /./g;
    return $_;
    return;
};

1;
