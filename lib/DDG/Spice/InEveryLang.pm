package DDG::Spice::InEveryLang;
# ABSTRACT: Returns code examples for popular coding puzzles

use strict;
use DDG::Spice;
use JSON::MaybeXS;

my $json = JSON->new;
my $languages_raw = share('languages.json')->slurp;
my $languages = $json->decode($languages_raw);

my @language_regexps = ();
for( @{$languages->{languages}} ) {
    my $language = $_->{language};
    $language =~ s/\#/sharp/g;
    $language =~ s/\+/plus/g;
    $language =~ s/\-/dash/g;
    push(@language_regexps, "(?<".$language.">(?<![\\w\#\\+])(".join("|", @{ $_->{triggers} }).")(?![\\w\#\\+]))");
}

my $language_finder = join("|", @language_regexps);
$language_finder =~ s/\+/\\+/g;

triggers startend => "fizz buzz", "fizzbuzz", "quine", "fibonacci sequence", "binary search";

spice to => 'http://www.ineverylang.com/ddg-$1.json';
spice from => '(.*)/(.*)';

handle query_lc => sub {
    $_ =~ m/(fizz ?buzz)|(quine)|(fibonacci sequence)|(binary search)/;
    my $puzzle;
    if($1) {
        $puzzle = 'fizz-buzz';
        $_ =~ s/fizz ?buzz//;
    } elsif($2) {
        $puzzle = 'quine';
        $_ =~ s/quine//;
    } elsif ($3) {
        $puzzle = 'fibonacci-sequence';
        $_ =~ s/fibonacci sequence//;
    } elsif ($4) {
        $puzzle = 'binary-search';
        $_ =~ s/binary search//;
    } else {
        return;
    }

    $_ =~ /$language_finder/;
    my @languages = keys %+;
    my $languages_length = @languages;

    if($languages_length > 0) {
        my $language = pop(@languages);
        my $raw_language = $+{$language};

        $language =~ s/sharp/\#/g;
        $language =~ s/plus/\+/g;
        $language =~ s/dash/\-/g;

        $raw_language =~ s/\+/\\\+/g;

        $_ =~ s/$raw_language//;
        $_ =~ s/in|examples?|solutions?|code|help|bugs?|\s//g;

        if (length($_) == 0) {
          return $puzzle, $language;
        } else {
          return;
        }
    } else {
        return;
    }


};

1;
