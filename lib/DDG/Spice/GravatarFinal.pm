package DDG::Spice::GravatarFinal;
# ABSTRACT: Shows gravatar of a given e-mail.

use DDG::Spice;

triggers start => "///***never_trigger***///";

spice to => 'http://en.gravatar.com/$1.json?callback={{callback}}';

attribution github => ['https://github.com/adman','Adman'],
            twitter => ['http://twitter.com/adman_X','adman_X'];

handle remainder => sub {
    return;
};

1;
