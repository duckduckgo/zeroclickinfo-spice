package DDG::Spice::DoiBibtex;

use DDG::Spice;

description "Look up a digital object identifier (bibtex code)";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/DoiBibtex.pm";
attribution github => ["https://github.com/nomeata", "Joachim Breitner"],
            web => ["http://www.joachim-breitner.de", "Joachim Breitner"],
            email => ['mail@joachim-breitner.de', "Joachim Breitner"];
status "enabled";

triggers start => 'This spice should never match any request, as it is just a helper for the doi spice.';

# This would work better, but needs content negotiation
spice to => 'http://dx.doi.org/$1';
spice wrap_string_callback => 1;
spice accept_header => 'application/x-bibtex';

spice is_cached => 1;

handle remainder => sub {
        return $_ if defined $_;
};

1;
