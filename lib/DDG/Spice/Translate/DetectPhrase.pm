package DDG::Spice::Translate::DetectPhrase;

use DDG::Spice;
use Moo;

with('DDG::SpiceRole::Translate');

attribution github  => ['https://github.com/ghedo', 'ghedo'      ],
            web     => ['http://ghedini.me', 'Alessandro Ghedini'];

my $langs = 'arabic|ar|chinese|zh|czech|cz|english|en|french|fr|greek|gr|italian|it|japanese|ja|korean|ko|polish|pl|portuguese|pt|romanian|ro|spanish|es|turkish|tr';

spice to   => 'http://ws.detectlanguage.com/0.2/detect?q=$1&key={{ENV{DDG_SPICE_DETECTLANGUAGE_APIKEY}}}';
spice from => '(.+)\/(.+)';
spice wrap_jsonp_callback => 1;

triggers start => "translate";

handle query_lc => sub {
    my $query = $_;
    my $to;

    $query =~ s/\s+/ /; #merge multiple spaces

    # Don't need to detect when "from" language is given
    return if ($query =~ (/from (?:$langs)/));

    # NEED TO MATCH UNICODE!
    if ($query =~ /^translate (.*?)(?: to ([a-z]+))?$/) {
        my ($phrase, $to )= ($1, $2);

        $to = (defined $to) ? shorten_lang($to) : substr($lang->locale, 0, 2);

        # Only use MyMemory for multi-word translation
        return unless ($phrase =~ /\w+\s+\w+/);

        # NEED TO ENCODE UNICODE!
        return ($phrase, $to);
    }

    return;
};

1;