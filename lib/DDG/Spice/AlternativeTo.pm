package DDG::Spice::AlternativeTo;

use DDG::Spice;

triggers start => "free","opensource","commercial";
triggers any => "alternative","alternatives";

handle query_lc => sub {
    if ($_ =~ /^(?:(free|opensource|commercial))?\s*(?:alternatives?\s*to\s*)?([\w\-]+)(?:\sfor\s(.*))?$/i) {
        if ($1 and $4) {
            # license and platform specified - queries like:
            # -> free alternative to firefox for mac
            # -> opensource matlab for linux
            return qq(/iat/software/$3/?platform=$4&license=$1);
        } elsif ($1) {
            # lincense secified only:
            # -> free nod32
            # -> opensource alternative to omnigraffle
            return qq(/iat/software/$3/?license=$1);
        } elsif ($4) {
            # platform specified:
            # -> TextMate for windows
            # -> alternative to vim for linux
            return qq(/iat/software/$3/?platform=$4);
        } elsif($2) {
            # license and platform not specified
            # in this case we need to match 'alternative(s) to':
            # -> alternative to firefox
            return qq(/iat/software/$3);
        }
    }
    return;
};

1;