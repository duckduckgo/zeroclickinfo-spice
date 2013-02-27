package DDG::Spice::Translate::Detect;

use DDG::Spice;

attribution github  => ['https://github.com/ghedo', 'ghedo'      ],
            web     => ['http://ghedini.me', 'Alessandro Ghedini'];

my $dicts = 'arabic|ar|chinese|zh|czech|cz|english|en|french|fr|greek|gr|italian|it|japanese|ja|korean|ko|polish|pl|portuguese|pt|romanian|ro|spanish|es|turkish|tr';

spice to   => 'http://ws.detectlanguage.com/0.2/detect?q=$1&key={{ENV{DDG_SPICE_DETECTLANGUAGE_APIKEY}}}';
spice from => '(.+)\/(.+)';
spice wrap_jsonp_callback => 1;

triggers query_lc => qr/translate/;

handle query_lc => sub {
    my ($query) = $_;
    
    sub shorten_lang {
        my ($lang) = @_;

        my $langs = {
            'arabic'     => 'ar',
            'chinese'    => 'zh',
            'czech'      => 'cz',
            'english'    => 'en',
            'french'     => 'fr',
            'greek'      => 'gr',
            'italian'    => 'it',
            'japanese'   => 'ja',
            'korean'     => 'ko',
            'polish'     => 'pl',
            'portuguese' => 'pt',
            'romanian'   => 'ro',
            'spanish'    => 'es',
            'turkish'    => 'tr'
        };

        return $langs->{$lang} ? $langs->{$lang} : $lang;
    };

    warn "Detect";
    if($query =~ /^translate (\w+) to ($dicts)$|^translate (\w+)$/) {
        if($1 && $2) {
            my ($word, $to) = ($1, $2);
            return ($word, shorten_lang($to));
        } elsif($3) {
            my ($word) = ($3);
            return ($word, substr($lang->locale, 0, 2));
        }
    }

    return;
};

1;
