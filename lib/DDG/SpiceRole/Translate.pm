package DDG::SpiceRole::Translate;
# ABSTRACT: Defines a role for the Translate plugin with a common function for the Translate packages

use Moo::Role;

sub shorten_lang {
    my ( $input ) = @_;

    my %hash = (
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
    );

    return $hash{$input} || $input;
};

1;