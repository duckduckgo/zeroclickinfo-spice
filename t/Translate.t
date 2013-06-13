#!/usr/bin/env perl

use strict;

use Test::More;
use DDG::Test::Language;
use DDG::Test::Spice;

# Define Language for purpose of the test
my $lang = test_language(de => 'German of Germany de_DE');

my @translate_tests = (
    "translate good from english to french" => {
        package => "FromTo",
        callback => "from_to",
        answers => ["enfr", "good"],
    },
    "translate good" => {
        package => "Detect",
        callback => "detect",
        answers => ["good", "de"],
    },
    "translate good to french" => {
        package => "Detect",
        callback => "detect",
        answers => ["good", "fr"],
    },
    "translate good morning" => {
        package => "DetectPhrase",
        callback => "detect_phrase",
        answers => ["good%20morning", "de"],
    },
    "translate good morning to french" => {
        package => "DetectPhrase",
        callback => "detect_phrase",
        answers => ["good%20morning", "fr"],
    },
    "translate good morning from english to french" => {
        package => "FromToPhrase",
        callback => "from_to_phrase",
        answers => ["en/fr", "good%20morning"],
    },
    # use MyMemory on non-english translations
    # single-word translations
    "translate azul from spanish to french" => {
        package => "FromToPhrase",
        callback => "from_to_phrase",
        answers => ["es/fr", "azul"],
    },
);

while (@translate_tests){
    my $query = shift @translate_tests;
    my %result = %{shift @translate_tests};
    my $package = $result{package};
    my $callback = $result{callback};
    my @answers = @{$result{answers}};

    my $req = DDG::Request->new( query_raw => $query, language => $lang );
    ddg_spice_test(
        ["DDG::Spice::Translate::$package"],
        $req,
        test_spice(
            '/js/spice/translate/'.$callback.'/'.$answers[0].'/'.$answers[1],
            caller => "DDG::Spice::Translate::$package"
        )
    );
}

# WHAT ABOUT QUERIES LIKE:

# "translate to/from from <lang>"
#   => Eg. "translate where did you come from"
#   => Eg. "translate where are you going to"

# "translate to/from to <lang>"
#   => Eg. "translate where are you going to to spanish"

# "translate to/from <lang> to <lang>"
#   => Eg. "translate where did you come from to spanish"
#   => Eg. "translate where did you come from from english to spanish"
#   => Eg. "translate I came from there from english to spanish"

done_testing;