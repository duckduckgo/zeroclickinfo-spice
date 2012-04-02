package DDG::Spice::AlternativeTo;

use DDG::Spice;

triggers start => "free","opensource","commercial";
triggers any => "alternative","alternatives";

handle query_lc => sub {
    if ($_ =~ /^(?:(free|opensource|commercial))?\s*(?:alternatives?\s*to\s*)?([\w\-]+)(?:\sfor\s(.*))?$/i) {
        if ($1 and $3) {
            # license and platform specified - queries like:
            # -> free alternative to firefox for mac
            # -> opensource matlab for linux
            return qq(/iat/$2/platform=$3/license=$1);
        } elsif ($1 and $2) {
            # lincense secified only:
            # -> free nod32
            # -> opensource alternative to omnigraffle
            return qq(/iat/$2/license=$1/);
        } elsif ($3) {
            # platform specified:
            # -> TextMate for windows
            # -> alternative to vim for linux
            return qq(/iat/$2/platform=$3/);
        } elsif($2) {
            # license and platform not specified
            # in this case we need to match 'alternative(s) to':
            # -> alternative to firefox
            return qq(/iat/$2/);
        }
    }
    return;
};

1;
