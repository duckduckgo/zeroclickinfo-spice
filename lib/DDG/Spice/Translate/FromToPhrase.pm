package DDG::Spice::Translate::FromToPhrase;

use DDG::Spice;
use Moo;

with('DDG::SpiceRole::Translate');

attribution github  => ['https://github.com/ghedo', 'ghedo'      ],
            web     => ['http://ghedini.me', 'Alessandro Ghedini'];

my $langs = 'arabic|ar|chinese|zh|czech|cz|english|en|french|fr|greek|gr|italian|it|japanese|ja|korean|ko|polish|pl|portuguese|pt|romanian|ro|spanish|es|turkish|tr';

spice to   => 'http://mymemory.translated.net/api/get?q=$3&langpair=$1|$2&de=office@duckduckgo.com';
spice from => '(.+)\/(.+)\/(.+)';
spice wrap_jsonp_callback => 1;

triggers start => "translate";

handle query_lc => sub {
    my $query = $_;

    $query =~ s/\s+/ /; #merge multiple spaces

    if($query =~ /^translate (.+) from ($langs)(?: to ($langs))?$/) {
        my ($phrase, $from, $to) = ($1, $2, $3);

        $from = shorten_lang($from);
        $to = (defined $to) ? shorten_lang($to) : substr($lang->locale, 0, 2);

        my $dict = $from.$to;

        # Only use mymemory for multi-word translation
        # or non-english translations
        return unless ($phrase =~ /\w+\s+\w+/ or $dict !~ /en/);

        return ($from, $to, $phrase);
    }

    return;
};

1;