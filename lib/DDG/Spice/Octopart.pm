package DDG::Spice::Octopart;

use DDG::Spice;

triggers any => "datasheet";

handle query_lc => sub {
    if ($_ =~ /^\s*(?:(datasheet))?\s*([\w\-]+)(?:\s(datasheet))?\s*$/i) {
        if ($1 or $3) {
            return qq(/ioctopart/$2/);
        }
    }
    return;
};

1;
